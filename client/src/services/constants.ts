export const ApiRoutes = {
  ALL_TABLES: "tables-names-all",
  SINGLE_TABLE: "/tables/${tableName}?page=${page}",
  DELETE_TABLE: "/tables/${tableName}/${id}",
  COLUMNS: "/tables-columns?tableName=${tableName}",
  POST_ROW: "/tables/${tableName}",
  SCRIPT: "/tables-${create_insert}-script?tableName=${tableName}",
  QUERY: "/queries/${queryNum}",
  TRIGGER: "/triggers/${triggerNum}",
  PROCEDURE: "/procedures/${procedureNum}",
  CALL_PROCEDURE: "/procedures/${procedureNum}/call",
} as const;
