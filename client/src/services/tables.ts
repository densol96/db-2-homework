import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const getAll = async () =>
  (await axiosInstance.get<ApiTypes.ALL_TABLES>(ApiRoutes.ALL_TABLES)).data;

export const getOne = async (tableName: string, page?: number) => {
  return (
    await axiosInstance.get<ApiTypes.SINGLE_TABLE>(
      ApiRoutes.SINGLE_TABLE.replace("${tableName}", tableName).replace(
        "${page}",
        page ? page + "" : ""
      )
    )
  ).data;
};
