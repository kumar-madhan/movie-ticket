import { api } from "./api";
import Cookies from 'js-cookie';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem(ACCESS_TOKEN_KEY)
    : null;

export const getRefreshToken = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem(REFRESH_TOKEN_KEY)
    : null;

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

  Cookies.set(ACCESS_TOKEN_KEY, access);
  Cookies.set(REFRESH_TOKEN_KEY, refresh);

  window.dispatchEvent(new Event('auth-change'));
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);

  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);

  window.dispatchEvent(new Event('auth-change'));
};

export const isLoggedIn = () =>
  typeof window !== 'undefined' &&
  !!localStorage.getItem(ACCESS_TOKEN_KEY);

export const getUserIdFromToken = (): number | null => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.userId ?? null;
};
