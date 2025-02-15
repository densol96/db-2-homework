import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useSqlQuery(activeNum: number) {
  const {
    data = { script: undefined, result: undefined, description: undefined },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.QUERY>({
    queryKey: ["query", activeNum],
    queryFn: () => Api.queries.getOne(activeNum),
    retry: 1,
  });
  const { script, result, description } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    script,
    result,
    description,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useSqlQuery;
