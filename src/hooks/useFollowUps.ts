import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { FollowUp } from "@/types";

const FOLLOWUPS_KEY = "follow-ups";

export function useFollowUps(clientId: string, onlyPending?: boolean) {
  return useQuery({
    queryKey: [FOLLOWUPS_KEY, clientId, onlyPending],
    queryFn: () =>
      api
        .get<FollowUp[]>(`/clients/${clientId}/follow-ups`, {
          params: { onlyPending },
        })
        .then((r) => r.data),
    enabled: !!clientId,
  });
}

export function useCreateFollowUp(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { description: string; dueDate: string }) =>
      api
        .post<FollowUp>(`/clients/${clientId}/follow-ups`, data)
        .then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FOLLOWUPS_KEY, clientId],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateFollowUp(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { description?: string; dueDate?: string; completed?: boolean };
    }) =>
      api
        .patch<FollowUp>(`/clients/${clientId}/follow-ups/${id}`, data)
        .then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FOLLOWUPS_KEY, clientId],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteFollowUp(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/clients/${clientId}/follow-ups/${id}`).then((r) => r.data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [FOLLOWUPS_KEY, clientId],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
