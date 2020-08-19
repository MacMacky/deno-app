import { Application } from "./deps.ts";
import company from "./routes/company.ts";

const app: Application = new Application();

app.use(company.routes());
app.use(company.allowedMethods());

export default app;
