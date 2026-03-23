import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { DashboardStats } from "@/types";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      api.get<DashboardStats>("/dashboard/stats").then((r) => r.data),
  });
}
