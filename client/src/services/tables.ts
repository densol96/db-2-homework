import { pausePromise } from "@/helpers/helpers";
import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const getAllTablenames = async () =>
  (await axiosInstance.get<ApiTypes.ALL_TABLES>(ApiRoutes.ALL_TABLES)).data;

export const getOne = async (tableName: string, page?: number) =>
  (
    await axiosInstance.get<ApiTypes.SINGLE_TABLE>(
      ApiRoutes.SINGLE_TABLE.replace("${tableName}", tableName).replace(
        "${page}",
        page ? page + "" : ""
      )
    )
  ).data;

export const deleteOne = async (tableName: string, id: number) => {
  await pausePromise(500); // for demonstrating how UI handles long requests :)
  const response = await axiosInstance.delete<ApiTypes.DELETED_TABLE>(
    ApiRoutes.DELETE_TABLE.replace("${tableName}", tableName).replace(
      "${id}",
      id + ""
    )
  );
  const data = response.data;
  if (data.status === "error" && data.rowsAffected === 0)
    throw new Error(
      `Ivalid row id of ${id} was provided - no data has been changed in '${tableName}'`
    );
  return data;
};

export const getColumns = async (tableName: string) =>
  (
    await axiosInstance.get<ApiTypes.COLUMNS>(
      ApiRoutes.COLUMNS.replace("${tableName}", tableName)
    )
  ).data;

export const post = async (
  formData: { [key: string]: string },
  tableName: string
) => {
  formData["parent_comment_id"] = formData["parent_comment_id"] || null;
  console.log(formData);
  const response = await axiosInstance.post<ApiTypes.CREATE_ROW>(
    ApiRoutes.POST_ROW.replace("${tableName}", tableName),
    formData
  );
  const data = response.data;
  if (data.status === "error" && data.rowsAffected === 0)
    throw new Error(`Unable to post`);
  return data;
};
