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
  const token = getAccessToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const payload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      )
    );

    return payload.userId ?? null;
  } catch {
    return null;
  }
};