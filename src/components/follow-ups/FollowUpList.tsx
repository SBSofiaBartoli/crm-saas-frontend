"use client";

import { FollowUp } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  followUps: FollowUp[];
  isLoading: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FollowUpList({
  followUps,
  isLoading,
  onComplete,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (followUps.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        No hay seguimientos registrados todavía.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {followUps.map((followUp) => {
        const isOverdue =
          !followUp.completed && new Date(followUp.dueDate) < new Date();

        return (
          <div
            key={followUp.id}
            className={cn(
              "flex items-start justify-between p-3 rounded-lg border bg-background",
              followUp.completed && "opacity-60",
            )}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {followUp.completed ? (
                  <Badge variant="secondary">Completado</Badge>
                ) : isOverdue ? (
                  <Badge variant="destructive">Vencido</Badge>
                ) : (
                  <Badge variant="outline">Pendiente</Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(followUp.dueDate).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p
                className={cn("text-sm", followUp.completed && "line-through")}
              >
                {followUp.description}
              </p>
            </div>
            <div className="flex gap-1 shrink-0 ml-2">
              {!followUp.completed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-green-600"
                  onClick={() => onComplete(followUp.id)}
                >
                  <Check size={14} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-destructive"
                onClick={() => onDelete(followUp.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
