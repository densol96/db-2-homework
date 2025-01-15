export type ALL_TABLES = {
  tableNames: string[];
  tablesTotal: number;
  totalResults: number;
};

export type SINGLE_TABLE = {
  result: object[];
  pagesTotal: number;
  resultsTotal: number;
};

export type DELETED_TABLE = {
  status: "success" | "error";
  rowsAffected: number;
};

export type CREATE_ROW = DELETED_TABLE;

export type COLUMNS = string[];
