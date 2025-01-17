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

export type SCRIPT = {
  script: string;
};

export type QUERY = {
  script: string;
  result: any;
  description: string;
};

export type TRIGGER = {
  script: string;
  description: string;
};

export type PROCEDURE = {
  script: string;
  description: string;
  isCallable: boolean;
};

export type CALL_PROCEDURE = {
  result: string;
};
