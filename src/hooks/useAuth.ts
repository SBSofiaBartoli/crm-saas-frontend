import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { saveAuth, clearAuth } from "@/lib/auth";
import { AuthResponse } from "@/types";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginData) =>
      api.post<AuthResponse>("/auth/login", data).then((r) => r.data),
    onSuccess: (data) => {
      saveAuth(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? "Error al iniciar sesión";
      }
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) =>
      api.post<AuthResponse>("/auth/register", data).then((r) => r.data),
    onSuccess: (data) => {
      saveAuth(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? "Error al registrarse";
      }
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return () => {
    clearAuth();
    router.push("/login");
  };
}
