import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useTable(tableName: string, page: number) {
  const {
    data = { result: [], pagesTotal: 0, resultsTotal: 0 },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.SINGLE_TABLE>({
    queryKey: [tableName, page],
    queryFn: () => Api.tables.getOne(tableName, page),
    retry: 1,
  });
  const { result: table, pagesTotal, resultsTotal } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    table,
    pagesTotal,
    resultsTotal,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useTable;
