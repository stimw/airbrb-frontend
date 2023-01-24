import { axios } from "@/libs/axios";
import { LoginRequest, RegisterRequest } from "../types";

export const login = (data: LoginRequest) =>
  axios.post("/user/auth/login", data);

export const register = (data: RegisterRequest) =>
  axios.post("/user/auth/register", data);
