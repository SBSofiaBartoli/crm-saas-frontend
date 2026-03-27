"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  MessageSquare,
  CalendarCheck,
  AlertTriangle,
} from "lucide-react";

interface Props {
  stats: {
    totalClients: number;
    totalInteractions: number;
    pendingFollowUps: number;
    overdueFollowUps: number;
  };
  isLoading: boolean;
}

const cards = [
  {
    key: "totalClients" as const,
    label: "Clientes registrados",
    icon: Users,
    description: "Total en tu cartera",
  },
  {
    key: "totalInteractions" as const,
    label: "Interacciones",
    icon: MessageSquare,
    description: "Llamadas, reuniones y mensajes",
  },
  {
    key: "pendingFollowUps" as const,
    label: "Seguimientos pendientes",
    icon: CalendarCheck,
    description: "Sin completar",
  },
  {
    key: "overdueFollowUps" as const,
    label: "Seguimientos vencidos",
    icon: AlertTriangle,
    description: "Fecha límite superada",
    alert: true,
  },
];

export function StatsCards({ stats, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];
        const isAlert = card.alert && value > 0;

        return (
          <Card
            key={card.key}
            className={isAlert ? "border-destructive/50" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <Icon
                size={18}
                className={
                  isAlert ? "text-destructive" : "text-muted-foreground"
                }
              />
            </CardHeader>
            <CardContent>
              <p
                className={`text-3xl font-semibold ${isAlert ? "text-destructive" : ""}`}
              >
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
