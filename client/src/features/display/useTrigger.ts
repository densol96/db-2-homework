import { Api } from "@/services/aoi-client";
import { useQuery } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import { extractErrorMessage } from "@/helpers/helpers";

function useTrigger(activeNum: number) {
  const {
    data = { script: undefined, description: undefined },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<ApiTypes.TRIGGER>({
    queryKey: ["trigger", activeNum],
    queryFn: () => Api.triggers.getOne(activeNum),
    retry: 1,
  });
  const { script, description } = data;
  let errorMsg: string | undefined = undefined;
  if (error) errorMsg = extractErrorMessage(error);
  return {
    script,
    description,
    isLoading,
    isSuccess,
    isError,
    errorMsg,
  };
}

export default useTrigger;
