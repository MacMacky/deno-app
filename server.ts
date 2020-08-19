import app from "./app.ts";
import createDbAndTables from "./db/main.ts";

await createDbAndTables("sample", ["company"]);
await app.listen(`0.0.0.0:${Deno.env.get("PORT") || 3000}`);
