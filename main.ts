import Application, { PORT } from "./deps.ts";
import root from "./routes/root.ts";

const app: Application = new Application();

app.use(root.routes());
app.use(root.allowedMethods());

await app.listen(`0.0.0.0:${PORT}`);
