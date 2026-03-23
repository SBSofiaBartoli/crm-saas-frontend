import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Interaction } from "@/types";

const INTERACTIONS_KEY = "interactions";

export function useInteractions(clientId: string) {
  return useQuery({
    queryKey: [INTERACTIONS_KEY, clientId],
    queryFn: () =>
      api
        .get<Interaction[]>(`/clients/${clientId}/interactions`)
        .then((r) => r.data),
    enabled: !!clientId,
  });
}

export function useCreateInteraction(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { type: string; summary: string; date: string }) =>
      api
        .post<Interaction>(`/clients/${clientId}/interactions`, data)
        .then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [INTERACTIONS_KEY, clientId],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteInteraction(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/clients/${clientId}/interactions/${id}`).then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [INTERACTIONS_KEY, clientId],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
