import { instance as axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";
import * as ApiTypes from "./types";

export const all = async () =>
  (await axiosInstance.get<ApiTypes.ALL_TABLES>(ApiRoutes.ALL_TABLES)).data;
