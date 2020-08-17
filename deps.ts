import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

const PORT = Deno.env.get("PORT") || 3000;

export {
  PORT,
};

export default Application;
