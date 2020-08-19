// For loading the configuration
import "https://deno.land/x/dotenv/load.ts";

// Export needed modules
export {
  Application,
  RouterContext,
  Router,
} from "https://deno.land/x/oak/mod.ts";
export {
  connect,
  r,
  Session,
} from "https://deno.land/x/rethinkdb@0.1.0/mod.ts";
