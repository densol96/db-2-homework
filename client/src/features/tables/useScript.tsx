import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useScript(tableName: string, type: "insert" | "create") {
  const {
    data = { script: undefined },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.SCRIPT>({
    queryKey: [tableName, type],
    queryFn: () => Api.tables.getScript(tableName, type),
    retry: 1,
  });
  const { script } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    script,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useScript;
