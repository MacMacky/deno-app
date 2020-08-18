import app from "./app.ts";
import { PORT } from "./deps.ts";

await app.listen(`0.0.0.0:${PORT}`);
