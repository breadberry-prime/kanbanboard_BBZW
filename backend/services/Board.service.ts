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

const deleteTask = (task: Task) => {
    console.log("delete task")
    tasks.deleteOne({"id": task.id}).then(console.log)
}

const updateTask = (task: Task) => {
    try {
        if (!!tasks.findOne({"id": task.id})){
            tasks.updateOne(
                (el) => el.id=== task.id,
                {column: task.column, value: task.value},
            )
        }
        else {
            console.log("task doesn't exists can't move", task)
        }
    }
    catch (e) {
        console.log("error in updateTask", task)
    }
}



export {createTask, getTasks, updateTask, deleteTask}
