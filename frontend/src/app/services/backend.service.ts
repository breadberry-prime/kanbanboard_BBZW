import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {COLUMN_NAME, Task} from "../interfaces/Boards.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrlBase = "http://localhost:4040/api/"

  constructor(private http: HttpClient) { }

  getTasks = (): Observable<Object | Task[]>=> {
    return this.http.get(this.backendUrlBase + "getTasks");
  }

  createTask = (taskValue: string, taskColumn: COLUMN_NAME) => {
    try {
      return this.http.post(
        this.backendUrlBase + "createTask",
        {"value": taskValue, "column": taskColumn},
        {responseType: 'text'}
      )
    }
    catch (e) {
      console.log(e)
      return new Observable()
    }
  }

  deleteTask = (task: Task) => {
    return this.http.put(this.backendUrlBase + "deleteTask", {...task}, {responseType: 'text'})
  }

  updateTask = (task: Task) => {
    return this.http.patch(this.backendUrlBase + "updateTask", {...task}, {responseType: 'text'})
  }
}
