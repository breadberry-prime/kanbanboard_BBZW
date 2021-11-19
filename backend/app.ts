import { Router } from "https://deno.land/x/oak/mod.ts";
import {createTask, getTasks} from "./services/Board.service.ts";

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


console.log("loaded routes")

export { router }

// TODO clear overview
