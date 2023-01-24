import Axios, { AxiosRequestConfig } from "axios";
import tokenHandler from "@/utils/tokenHandler";
import configInfo from "@/config.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BACKEND_PORT = configInfo.BACKEND_PORT;

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = tokenHandler.getToken().token;
  config.headers = config.headers ?? {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  config.headers["wuhu"] = "whu";
  return config;
}

export const axios = Axios.create({
  // baseURL: `http://localhost:${BACKEND_PORT}`,
  // baseURL: "https://airbrb-backend.onrender.com",
  baseURL: "https://airbrb-backend.fly.dev",
});

axios.interceptors.request.use(authRequestInterceptor);
