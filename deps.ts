import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const PORT = Deno.env.get("PORT") || 3000;
const generateID = v4.generate;

export {
  PORT,
  generateID,
};

export default Application;
