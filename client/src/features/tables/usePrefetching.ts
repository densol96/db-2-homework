import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function usePrefetching(
  isSuccess: boolean,
  page: number,
  pagesTotal: number,
  tableName: string
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      if (page < pagesTotal) {
        queryClient.prefetchQuery({
          queryKey: [tableName, page + 1],
          queryFn: () => Api.tables.getOne(tableName, page),
          retry: 3,
          staleTime: Infinity,
        });
      }
      if (page > 1) {
        queryClient.prefetchQuery({
          queryKey: [tableName, page - 1],
          queryFn: () => Api.tables.getOne(tableName, page),
          retry: 3,
          staleTime: Infinity,
        });
      }
    }
  }, [page, isSuccess, tableName]);
}

export default usePrefetching;
