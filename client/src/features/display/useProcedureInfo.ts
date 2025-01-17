import { Api } from "@/services/aoi-client";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useProcedureInfo(activeNum: number) {
  const {
    data = { script: undefined, description: undefined, isCallable: false },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.PROCEDURE>({
    queryKey: ["procedure", activeNum],
    queryFn: () => Api.procedures.getOne(activeNum),
    retry: 1,
  });
  const { script, description, isCallable } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    script,
    description,
    isCallable,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useProcedureInfo;
