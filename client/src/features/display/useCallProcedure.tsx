import { Api } from "@/services/aoi-client";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useCallProcedure(activeNum: number) {
  const {
    data = { result: undefined },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.CALL_PROCEDURE>({
    queryKey: ["procedure_call", activeNum],
    queryFn: () => Api.procedures.callOne(activeNum),
    retry: 1,
  });
  const { result } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    result,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useCallProcedure;
