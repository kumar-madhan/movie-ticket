import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
});

api.interceptors.request.use(async (config) => {
  let token = Cookies.get("access_token");

  // Try refresh if no token
  if (!token) token = await refreshToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
