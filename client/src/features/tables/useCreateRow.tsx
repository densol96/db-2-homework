import { post } from "@/services/tables";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ApiTypes from "@/services/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const useCreateRow = (tableName: string) => {
  const queryClient = useQueryClient();
  const { isPending: isPosting, mutate: postRow } = useMutation<
    void,
    Error,
    { [key: string]: any }
  >({
    mutationFn: async (formData) => {
      const promise: Promise<ApiTypes.CREATE_ROW> = post(formData, tableName);
      toast.promise(promise, {
        loading: "Posting...",
        success: <b>New row posted</b>,
        error: (error) => {
          const errMsg =
            error instanceof AxiosError
              ? error.response?.data?.message
              : error.message;
          return (
            <b style={{ textAlign: `center` }}>
              {errMsg || "Unable to remove the row!"}{" "}
            </b>
          );
        },
      });
    },
    onSuccess: () => {
      alert("SHOULD INVALIDATE");
      queryClient.invalidateQueries({ queryKey: [tableName] });
    },
  });

  return { isPosting, postRow };
};

export default useCreateRow;
