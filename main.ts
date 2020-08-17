import Application, { PORT } from "./deps.ts";
import company from "./routes/company.ts";

const app: Application = new Application();

app.use(company.routes());
app.use(company.allowedMethods());

await app.listen(`0.0.0.0:${PORT}`);
