import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Client } from "@/types";

const CLIENTS_KEY = "clients";

export function useClients(search?: string) {
  return useQuery({
    queryKey: [CLIENTS_KEY, search],
    queryFn: () =>
      api.get<Client[]>("/clients", { params: { search } }).then((r) => r.data),
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: [CLIENTS_KEY, id],
    queryFn: () => api.get<Client>(`/clients/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Client>) =>
      api.post<Client>("/clients", data).then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY] });
    },
  });
}

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Client>) =>
      api.patch<Client>(`/clients/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/clients/${id}`).then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY] });
    },
  });
}

export function useImportClients() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return api
        .post<{
          imported: number;
          errors: { row: number; reason: string }[];
          message: string;
        }>("/clients/import", formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then((r) => r.data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY] });
    },
  });
}
