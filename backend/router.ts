import { Router } from "https://deno.land/x/oak/mod.ts";
import {createTask, getTasks, updateTask} from "./services/Board.service.ts";

const router: Router = new Router()

router.get("/", (ctx) => {
    ctx.response.body = "Hello World"
})

router
    .get("/api", (ctx) => {
        ctx.response.body = "movie db api documentation";
    })
    .get("/api/getTasks", (ctx) => {
        ctx.response.body = getTasks()
    })
    .post("/api/createTask", async (ctx) => {
        try {
            const result = ctx.request.body();
            if (result.type === "json") {
                const taskBlueprint = await result.value;

                const task = await createTask(taskBlueprint.value, taskBlueprint.column)

                ctx.response.body = "task created id: " + task.id;
                ctx.response.status = 200
            } else {
                console.log("err", result.type)
                new Error("wrong body type")
            }
        }
        catch (e){
            console.log(e)
        }
    })
    .patch("/api/updateTask", async (ctx) => {
        try {
            const result = ctx.request.body(); // content type automatically detected
            if (result.type === "json") {
                const task = await result.value; // an object of parsed JSON
                updateTask(task)
                ctx.response.body = "success"
                ctx.response.status = 200
                console.log("update sucessfull")
            } else {
                console.log("warning unknown data type", result.type)
            }
        } catch (e) {
            console.log("we ran into a error while updating the task", e)
            ctx.response.body = e
            ctx.response.status = 400
        }
    })

console.log("loaded routes")

export { router }

// TODO clear overview
