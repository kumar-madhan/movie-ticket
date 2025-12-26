import api from "./api";
import Cookies from "js-cookie";

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  Cookies.set("access_token", data.accessToken, { secure: true, sameSite: "strict" });
  Cookies.set("refresh_token", data.refreshToken, { secure: true, sameSite: "strict" });
  return data;
}

export async function register(name: string, email: string, password: string) {
  return api.post("/auth/register", { name, email, password });
}

export async function refreshToken() {
  const refresh = Cookies.get("refresh_token");
  if (!refresh) return null;
  try {
    const { data } = await api.post("/auth/refresh", { refreshToken: refresh });
    Cookies.set("access_token", data.accessToken, { secure: true, sameSite: "strict" });
    return data.accessToken;
  } catch {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    return null;
  }
}
