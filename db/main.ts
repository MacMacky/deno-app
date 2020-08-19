import { r } from "../deps.ts";
import { createConnection } from "../helpers/index.ts";

const createDbAndTables = async (dbName: string, tables: string[]) => {
  try {
    const conn = await createConnection();
    const dbList: string[][] = await r.dbList().run(conn);

    if (!dbList[0].includes(dbName)) {
      await r
        .dbCreate(dbName)
        .run(conn);
    }
    let tableList: any[] = await r.db(dbName).tableList().run(conn);
    tableList = tableList[0];
    const tablesDoesNotExits = tables.filter((t) => !tableList.includes(t));
    tablesDoesNotExits.forEach(async (table) => {
      await r
        .db(dbName)
        .tableCreate(table)
        .run(conn);
    });
  } catch (e) {
    console.error(e);
  }
};

export default createDbAndTables;
