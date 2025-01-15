export const ApiRoutes = {
  ALL_TABLES: "tables-names-all",
  SINGLE_TABLE: "/tables/${tableName}?page=${page}",
  DELETE_TABLE: "/tables/${tableName}/${id}",
} as const;
