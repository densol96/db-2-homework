import * as tables from "./tables";
import * as queries from "./queries";
import * as triggers from "./triggers";
import * as procedures from "./procedures";

export const Api = {
  tables,
  queries,
  triggers,
  procedures,
} as const;
