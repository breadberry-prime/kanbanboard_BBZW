import {FileDB} from "https://deno.land/x/filedb/mod.ts";
import {COLUMN_NAME, Task} from "../models/Board.interface.ts";

const db = new FileDB({rootDir:"./data", isAutosave: true})

const tasks = await db.getCollection<Task>("tasks")

const getTasks = (): Array<Task> => {
    return tasks["data"]
}

const createTask = (taskValue: string, taskColumn: COLUMN_NAME) => {
    return tasks.insertOne({"value": taskValue, "column": taskColumn})
}


export {createTask, getTasks}
