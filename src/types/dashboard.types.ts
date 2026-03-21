import { Client } from "./client.types";
import { FollowUp } from "./follow-up.types";

export interface DashboardStats {
  stats: {
    totalClients: number;
    totalInteractions: number;
    pendingFollowUps: number;
    overdueFollowUps: number;
  };
  recentClients: Client[];
  upcomingFollowUps: FollowUp[];
  interactionsByType: {
    type: string;
    count: number;
  }[];
}
