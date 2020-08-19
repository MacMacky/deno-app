import { Session, RouterContext, Context } from "../deps.ts";

interface Company {
  id: string;
  name: string;
  address: string;
  description?: string;
}

type CompanyRequestBody = Pick<Company, "address" | "description" | "name">;

interface ErrorWithConnection extends Error {
  isApi: true;
  conn?: Session;
}

interface ContextConnection extends RouterContext<{ [key: string]: string }> {
  connection?: Session;
}

export {
  Company,
  ContextConnection,
  CompanyRequestBody,
  ErrorWithConnection,
};
