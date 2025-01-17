import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const getOne = async (triggerNum: number) =>
  (
    await axiosInstance.get<ApiTypes.TRIGGER>(
      ApiRoutes.TRIGGER.replace("${triggerNum}", triggerNum + "")
    )
  ).data;
