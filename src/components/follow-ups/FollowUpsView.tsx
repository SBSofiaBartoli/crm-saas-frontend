"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { FollowUp } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function useAllPendingFollowUps() {
  return useQuery({
    queryKey: ["follow-ups", "all-pending"],
    queryFn: () =>
      api.get<FollowUp[]>("/follow-ups/pending").then((r) => r.data),
  });
}

export function FollowUpsView() {
  const router = useRouter();
  const { data: followUps = [], isLoading } = useAllPendingFollowUps();

  const overdue = followUps.filter((f) => new Date(f.dueDate) < new Date());
  const upcoming = followUps.filter((f) => new Date(f.dueDate) >= new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Seguimientos pendientes</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {followUps.length} seguimiento{followUps.length !== 1 ? "s" : ""} sin
          completar
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : followUps.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CalendarClock
              size={32}
              className="mx-auto text-muted-foreground mb-3"
            />
            <p className="text-sm text-muted-foreground">
              No tenés seguimientos pendientes. ¡Todo al día!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {overdue.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-destructive">
                  Vencidos ({overdue.length})
                </h2>
                <Separator className="flex-1" />
              </div>
              {overdue.map((followUp) => (
                <FollowUpCard
                  key={followUp.id}
                  followUp={followUp}
                  overdue
                  onNavigate={() =>
                    followUp.client &&
                    router.push(`/clients/${followUp.client.id}`)
                  }
                />
              ))}
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Próximos ({upcoming.length})
                </h2>
                <Separator className="flex-1" />
              </div>
              {upcoming.map((followUp) => (
                <FollowUpCard
                  key={followUp.id}
                  followUp={followUp}
                  overdue={false}
                  onNavigate={() =>
                    followUp.client &&
                    router.push(`/clients/${followUp.client.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FollowUpCard({
  followUp,
  overdue,
  onNavigate,
}: {
  followUp: FollowUp;
  overdue: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between p-4 rounded-lg border bg-background",
        overdue && "border-destructive/40 bg-destructive/5",
      )}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <CalendarClock
          size={16}
          className={cn(
            "mt-0.5 shrink-0",
            overdue ? "text-destructive" : "text-muted-foreground",
          )}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium">{followUp.description}</p>
          {followUp.client && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {followUp.client.name}
              {followUp.client.company && ` · ${followUp.client.company}`}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {overdue ? (
              <Badge variant="destructive" className="text-xs">
                Vencido
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                Pendiente
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {new Date(followUp.dueDate).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1 shrink-0 ml-2"
        onClick={onNavigate}
      >
        Ver cliente
        <ArrowRight size={14} />
      </Button>
    </div>
  );
}
