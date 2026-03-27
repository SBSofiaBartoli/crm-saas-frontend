"use client";

import { useRouter } from "next/navigation";
import { FollowUp } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  followUps: FollowUp[];
  isLoading: boolean;
}

export function UpcomingFollowUps({ followUps, isLoading }: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Próximos seguimientos</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
          onClick={() => router.push("/follow-ups")}
        >
          Ver todos
          <ArrowRight size={14} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : followUps.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No hay seguimientos pendientes.
          </p>
        ) : (
          <div className="space-y-3">
            {followUps.map((followUp) => {
              const isOverdue = new Date(followUp.dueDate) < new Date();

              return (
                <div
                  key={followUp.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/60",
                    isOverdue && "border-destructive/40 bg-destructive/5",
                  )}
                  onClick={() =>
                    followUp.client &&
                    router.push(`/clients/${followUp.client.id}`)
                  }
                >
                  <CalendarClock
                    size={16}
                    className={cn(
                      "mt-0.5 shrink-0",
                      isOverdue ? "text-destructive" : "text-muted-foreground",
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{followUp.description}</p>
                    {followUp.client && (
                      <p className="text-xs text-muted-foreground truncate">
                        {followUp.client.name}
                        {followUp.client.company &&
                          ` · ${followUp.client.company}`}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    {isOverdue ? (
                      <Badge variant="destructive" className="text-xs">
                        Vencido
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {new Date(followUp.dueDate).toLocaleDateString(
                          "es-AR",
                          {
                            day: "2-digit",
                            month: "short",
                          },
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
