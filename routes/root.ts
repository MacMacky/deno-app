import { Router } from "https://deno.land/x/oak/mod.ts";

const router: Router = new Router();

router
  .get("/", (ctx, next) => {
    ctx.response.body = { "message": "Hello World!" };
  })
  .get("/:name", (ctx) => {
    ctx.response.body = { "message": `Hello ${ctx.params.name || "Mark"}!` };
  });

export default router;
