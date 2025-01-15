import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";

function useTableNames(): {
  tableNames: string[];
  tablesTotal: number;
  isLoading: boolean;
  isSuccess: boolean;
} {
  const {
    data = { tableNames: [], tablesTotal: 0 },
    isLoading,
    isSuccess,
  } = useQuery<ApiTypes.ALL_TABLES>({
    queryKey: [ApiRoutes.ALL_TABLES],
    queryFn: Api.tables.getAllTablenames,
    staleTime: Infinity,
  });
  const { tableNames, tablesTotal } = data;
  return { tableNames, tablesTotal, isLoading, isSuccess };
}

export default useTableNames;
