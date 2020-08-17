import "https://deno.land/x/dotenv/load.ts";
import {
  Application,
  RouterContext as Context,
} from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const PORT = Deno.env.get("PORT") || 3000;
const generateID = v4.generate;

interface Company {
  id: string;
  name: string;
  address: string;
  description?: string;
}

type CompanyRequestBody = Pick<Company, "address" | "description" | "name">;

export {
  PORT,
  generateID,
  Context,
  Company,
  CompanyRequestBody,
};

export default Application;
