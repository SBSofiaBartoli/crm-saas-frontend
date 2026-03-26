"use client";

import { Interaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Phone, Users, MessageSquare } from "lucide-react";

const typeConfig = {
  call: { label: "Llamada", icon: Phone, variant: "secondary" as const },
  meeting: { label: "Reunión", icon: Users, variant: "default" as const },
  message: {
    label: "Mensaje",
    icon: MessageSquare,
    variant: "outline" as const,
  },
};

interface Props {
  interactions: Interaction[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function InteractionList({ interactions, isLoading, onDelete }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (interactions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        No hay interacciones registradas todavía.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {interactions.map((interaction) => {
        const config = typeConfig[interaction.type as keyof typeof typeConfig];
        const Icon = config?.icon ?? Phone;

        return (
          <div
            key={interaction.id}
            className="flex items-start justify-between p-3 rounded-lg border bg-background"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-md bg-muted">
                <Icon size={14} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={config?.variant ?? "secondary"}>
                    {config?.label ?? interaction.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(interaction.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm">{interaction.summary}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 hover:text-destructive"
              onClick={() => onDelete(interaction.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
