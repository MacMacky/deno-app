import app from "./app.ts";
import createDbAndTables from "./db/main.ts";
import { DB } from "./helpers/index.ts";

await createDbAndTables(DB, ["company", "user"]);
await app.listen(`0.0.0.0:${Deno.env.get("PORT") || 3000}`);
