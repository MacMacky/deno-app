import { connect } from "../deps.ts";
import { ErrorWithConnection, ContextConnection } from "./types.ts";

const createConnection = () => {
  return connect({
    hostname: Deno.env.get("DB_HOST") || "localhost",
    port: Number(Deno.env.get("DB_PORT")) || 28015,
    username: Deno.env.get("DB_USER") || "admin",
    password: Deno.env.get("DB_PASS") || "",
  });
};

const asyncWrapperWithConnection = (fn: Function) => {
  return async (ctx: ContextConnection, next?: () => Promise<void>) => {
    const conn = await createConnection();
    ctx.connection = conn;
    return fn(ctx, next)
      .then((response: any) => {
        ctx.response.status = response.status ? response.status : 200;
        ctx.response.body = response.data;
        conn.close();
      })
      .catch((e: ErrorWithConnection) => {
        conn && conn.close();
        e.isApi ? ctx.response.status = 400 : ctx.response.status = 500;
        ctx.response.body = { message: e.message };
      });
  };
};

const DB = Deno.env.get("DB_NAME") || "";

export {
  DB,
  asyncWrapperWithConnection,
  createConnection,
};
