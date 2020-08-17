import { Context, Company, CompanyRequestBody, generateID } from "../deps.ts";

let data: Company[] = [];

export const root = (ctx: Context) => {
  ctx.response.body = { "message": "Hello World!" };
};

export const getCompanies = (ctx: Context) => {
  ctx.response.body = data;
};

export const getCompany = (ctx: Context) => {
  const company = data.find((o) => o.id === ctx.params.id);
  if (!company) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Company does not exists." };
    return;
  }
  ctx.response.body = company;
};

export const createCompany = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const company: CompanyRequestBody = await ctx.request.body(
      { type: "json" },
    ).value;
    data.push({ ...company, id: generateID() });
  }
  ctx.response.status = 201;
  ctx.response.body = { created: true };
};

export const updateCompany = async (ctx: Context) => {
  const company = data.find((o) => o.id === ctx.params.id);

  if (!company) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Company does not exists." };
    return;
  }

  if (ctx.request.hasBody) {
    const requestBody: CompanyRequestBody = await ctx.request.body(
      { type: "json" },
    ).value;
    data = data.filter((o) => o.id !== ctx.params.id);
    data.push({ ...company, ...requestBody, id: (ctx.params.id as string) });
  }
  ctx.response.status = 201;
  ctx.response.body = { updated: true };
};

export const deleteCompany = (ctx: Context) => {
  const company = data.find((o) => o.id === ctx.params.id);
  if (!company) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Company does not exists." };
    return;
  }
  data = data.filter((o) => o.id !== ctx.params.id);
  ctx.response.status = 201;
  ctx.response.body = { deleted: true };
};
