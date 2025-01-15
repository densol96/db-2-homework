import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";

function useColumns(tableName: string) {
  const {
    data: columns = [],
    isLoading,
    isSuccess,
  } = useQuery<ApiTypes.COLUMNS>({
    queryKey: ["useColumns", tableName],
    queryFn: () => Api.tables.getColumns(tableName),
    staleTime: Infinity,
  });

  return { columns, isLoading, isSuccess };
}

export default useColumns;
