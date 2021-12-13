import {Task} from "../interfaces/Boards.interface";

export class Column {
  constructor(public name: string, public id: string, public tasks: Array<Task>) {}
}
