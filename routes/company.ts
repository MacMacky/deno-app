import { Router } from "https://deno.land/x/oak/mod.ts";
import * as company from "../controllers/company.ts";

const router: Router = new Router();

router
  .get("/", company.root)
  .get("/company", company.getCompanies)
  .get("/company/:id", company.getCompany)
  .post("/company", company.createCompany)
  .put("/company/:id", company.updateCompany)
  .delete("/company/:id", company.deleteCompany);

export default router;
