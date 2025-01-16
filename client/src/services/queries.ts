import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const getOne = async (queryNum: number) =>
  (
    await axiosInstance.get<ApiTypes.QUERY>(
      ApiRoutes.QUERY.replace("${queryNum}", queryNum + "")
    )
  ).data;
