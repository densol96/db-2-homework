import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const getOne = async (procedureNum: number) =>
  (
    await axiosInstance.get<ApiTypes.PROCEDURE>(
      ApiRoutes.PROCEDURE.replace("${procedureNum}", procedureNum + "")
    )
  ).data;

export const callOne = async (procedureNum: number) =>
  (
    await axiosInstance.get<ApiTypes.CALL_PROCEDURE>(
      ApiRoutes.CALL_PROCEDURE.replace("${procedureNum}", procedureNum + "")
    )
  ).data;
