import { Router } from "../deps.ts";
import { asyncWrapperWithConnection as wrapper } from "../helpers/index.ts";
import * as company from "../controllers/company.ts";

const router: Router = new Router();

router
  .get("/", wrapper(company.root))
  .get("/company", wrapper(company.getCompanies))
  .get("/company/:id", wrapper(company.getCompany))
  .post("/company", wrapper(company.createCompany))
  .put("/company/:id", wrapper(company.updateCompany))
  .delete("/company/:id", wrapper(company.deleteCompany));

export default router;
