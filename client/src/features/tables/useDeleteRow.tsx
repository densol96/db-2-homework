import { deleteOne } from "@/services/tables";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const useDeleteRow = (tableName: string) => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteRow } = useMutation<
    ApiTypes.DELETED_TABLE,
    Error,
    [string, number]
  >({
    mutationFn: ([tableName, id]: [string, number]) => {
      const promise: Promise<ApiTypes.DELETED_TABLE> = deleteOne(tableName, id);
      toast.promise(promise, {
        loading: "Deleting...",
        success: <b>Row deleted!</b>,
        error: (error) => {
          const errMsg =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          return (
            <b style={{ textAlign: `center` }}>
              {error.response.data.message || "Unable to remove the row!"}{" "}
            </b>
          );
        },
      });
      return promise;
    },
    onSuccess: (data: ApiTypes.DELETED_TABLE) => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
    },
  });

  return { isDeleting, deleteRow };
};

export default useDeleteRow;
