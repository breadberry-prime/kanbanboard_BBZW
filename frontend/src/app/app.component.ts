import { Component } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardModel } from './models/board.model';
import { Column } from './models/column.model';
import {BackendService} from "./services/backend.service";
import {COLUMN_NAME, Task} from "./interfaces/Boards.interface";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend-kanban';
  name = 'BBZW Sursee M133 Kanbanboard';

  BacklogColumn = new Column('Backlog', '0', [])
  InProgressColumn = new Column('In Progress', '1', [])
  DoneColumn = new Column('Done', '2', [])

  public board: BoardModel = new BoardModel('KanbanBoard', [this.BacklogColumn, this.InProgressColumn, this.DoneColumn]);

  constructor(private backendService: BackendService){
    this.loadValues().then(e => console.log("loaded, values"))
  }

  public ngOnInit(): void {
    console.log(this.board);
  }

  public dropGrid(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<Task[]>): void {
    this.updateTask(event.item.data, event.container.id)

    if (event.previousContainer === event.container) {
      console.log("container data", JSON.stringify(event.container.data))
      console.log("previous index", event.previousIndex)
      console.log("current index", event.currentIndex)
      console.log("data", event.item.data)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  private updateTask(task: Task, newIndex: string) {
    if (task.value && newIndex){
      task.column = parseInt(newIndex)
      this.backendService.updateTask(task).subscribe(r => {
        this.loadValues()
      })
    } else {
      console.log("invalid data entry", task, newIndex)
    }
  }

  public async loadValues() {
    this.BacklogColumn.tasks = []
    this.InProgressColumn.tasks = []
    this.DoneColumn.tasks = []

    const tasksObservable = this.backendService.getTasks()
    tasksObservable.subscribe(_tasks => {
      // @ts-ignore
      const tasks: Task[] = _tasks
      tasks.forEach(task => {
        switch (task.column) {
          case COLUMN_NAME.BACKLOG:
            if (task.value != null) {
              this.BacklogColumn.tasks.push(task)
            }
            break
          case COLUMN_NAME.IN_PROGRESS:
            if (task.value != null) {
              this.InProgressColumn.tasks.push(task)
            }
            break
          case COLUMN_NAME.DONE:
            if (task.value != null) {
              this.DoneColumn.tasks.push(task)
            }
            break
        }
      })
    })
  }
}
