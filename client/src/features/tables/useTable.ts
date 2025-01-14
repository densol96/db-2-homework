import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";

function useTable(tableName: string, page: number) {
  const {
    data = { result: [], pagesTotal: 0, totalResults: 0 },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.SINGLE_TABLE>({
    queryKey: [ApiRoutes.SINGLE_TABLE, tableName, page],
    queryFn: () => Api.tables.getOne(tableName, page),
    retry: 1,
  });
  const { result: table, pagesTotal, totalResults } = data;
  return {
    table,
    pagesTotal,
    totalResults,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

export default useTable;
