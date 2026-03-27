import { User, AuthResponse } from "@/types";

export const saveAuth = (data: AuthResponse) => {
  document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : null;
};

export const clearAuth = () => {
  document.cookie = "token=; path=/; max-age=0";
  localStorage.removeItem("user");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
