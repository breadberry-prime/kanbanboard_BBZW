import {Application} from "https://deno.land/x/oak/mod.ts";
import {oakCors} from "https://deno.land/x/cors@v1.2.2/oakCors.ts"
import {router} from "./router.ts"

const port = 4040
const app = new Application()

app.use(oakCors({
    origin: '*'
}));

app.use(router.routes())
app.use(router.allowedMethods())

console.log("http://localhost:" + port.toString())
await app.listen({port})
