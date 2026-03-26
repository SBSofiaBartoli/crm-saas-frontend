"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { StatsCards } from "./StatsCards";
import { RecentClients } from "./RecentClients";
import { UpcomingFollowUps } from "./UpcomingFollowUps";
import { getUser } from "@/lib/auth";

export function DashboardView() {
  const { data, isLoading } = useDashboard();
  const user = getUser();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {greeting}, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Acá está el resumen de tu cartera de hoy.
        </p>
      </div>

      <StatsCards
        stats={
          data?.stats ?? {
            totalClients: 0,
            totalInteractions: 0,
            pendingFollowUps: 0,
            overdueFollowUps: 0,
          }
        }
        isLoading={isLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentClients
          clients={data?.recentClients ?? []}
          isLoading={isLoading}
        />
        <UpcomingFollowUps
          followUps={data?.upcomingFollowUps ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
