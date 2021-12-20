import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {FormControl, FormGroup} from '@angular/forms';
import {VIEW_STATUS, Task} from "../interfaces/Boards.interface";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();

  viewState: VIEW_STATUS
  viewStates = VIEW_STATUS
  activeTask: Task

  createTaskForm = new FormGroup({
    taskValue: new FormControl(),
    taskColumn: new FormControl()
  })

  alterTaskForm: FormGroup

  constructor(private backendService: BackendService) {
    this.viewState = VIEW_STATUS.CREATE
    this.activeTask = {value: "", column: 2}

    this.alterTaskForm = new FormGroup({
      taskValue: new FormControl(this.activeTask.value),
      taskColumn: new FormControl(this.activeTask.column)
    })
  }

  ngOnInit(): void {}

  createTask() {
    if (this.createTaskForm.valid){
      const value = this.createTaskForm.controls['taskValue'].value
      const column = parseInt(this.createTaskForm.controls['taskColumn'].value)
      this.backendService.createTask(value, column - 1).subscribe(r => {
        this.newItemEvent.emit(true)
      })
    }
  }

  update(){
    const value = this.alterTaskForm.controls['taskValue'].value
    const column = parseInt(this.alterTaskForm.controls['taskColumn'].value) -1

    if (value && column){
      this.activeTask.value = value
      this.activeTask.column = column

      this.backendService.updateTask(this.activeTask).subscribe(r => {
        this.newItemEvent.emit(true)
      })
    } else {
      console.log("invalid data entry", {value, column})
    }
  }

  delete(){
    this.backendService.deleteTask(this.activeTask).subscribe(r => {
      this.newItemEvent.emit(true)
    })
  }

  setTaskOperation(task: Task){
    this.alterTaskForm.controls['taskValue'].setValue(task.value)
    this.viewState = VIEW_STATUS.ALTERNATE
    this.activeTask = task
    console.log(task)
  }

  updateTable(){
    this.newItemEvent.emit(true)
  }
}
