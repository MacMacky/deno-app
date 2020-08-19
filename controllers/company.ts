import { Session, r } from "../deps.ts";
import {
  Company,
  CompanyRequestBody,
  ContextConnection,
} from "../helpers/types.ts";
import { DB } from "../helpers/index.ts";

export const root = async (ctx: ContextConnection) => {
  const result = await r.db(DB).tableList().run(
    ctx.connection as Session,
  );
  ctx.response.body = { "message": "Ok" };
};

export const getCompanies = async (ctx: ContextConnection) => {
  const companies = await r
    .db(DB)
    .table("company")
    .run<Company>(ctx.connection as Session);

  return { data: companies };
};

export const getCompany = async (ctx: ContextConnection) => {
  const [company] = await r
    .db(DB)
    .table("company")
    .get(ctx.params.id)
    .run<Company>(ctx.connection as Session);

  if (!company) {
    throw { message: "Company does not exists.", isApi: true };
  }

  return { data: company };
};

export const createCompany = async (ctx: ContextConnection) => {
  if (ctx.request.hasBody) {
    const company: CompanyRequestBody = await ctx.request.body(
      { type: "json" },
    ).value;
    await r.db(DB)
      .table("company")
      .insert(company)
      .run(ctx.connection as Session);
  }

  return { data: { created: true }, status: 201 };
};

export const updateCompany = async (ctx: ContextConnection) => {
  const [company] = await r
    .db(DB)
    .table("company")
    .get(ctx.params.id)
    .run<Company>(ctx.connection as Session);

  if (!company) {
    throw { message: "Company does not exists.", isApi: true };
  }

  if (ctx.request.hasBody) {
    const requestBody: CompanyRequestBody = await ctx.request.body(
      { type: "json" },
    ).value;

    await r.db(DB)
      .table("company")
      .get(ctx.params.id)
      .update(requestBody)
      .run(ctx.connection as Session);
  }

  return { data: { updated: true }, status: 201 };
};

export const deleteCompany = async (ctx: ContextConnection) => {
  const [company] = await r
    .db(DB)
    .table("company")
    .get(ctx.params.id)
    .run<Company>(ctx.connection as Session);

  if (!company) {
    throw { message: "Company does not exists.", isApi: true };
  }

  await r.db(DB)
    .table("company")
    .get(ctx.params.id)
    .delete()
    .run(ctx.connection as Session);

  return { data: { deleted: true }, status: 201 };
};
