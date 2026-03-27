"use client";

import { useRouter } from "next/navigation";
import { Client } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

interface Props {
  clients: Client[];
  isLoading: boolean;
}

export function RecentClients({ clients, isLoading }: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Últimos clientes agregados</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground"
          onClick={() => router.push("/clients")}
        >
          Ver todos
          <ArrowRight size={14} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Todavía no hay clientes registrados.
          </p>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors"
                onClick={() => router.push(`/clients/${client.id}`)}
              >
                <div>
                  <p className="text-sm font-medium">{client.name}</p>
                  {client.company && (
                    <p className="text-xs text-muted-foreground">
                      {client.company}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {client._count && (
                    <>
                      <Badge variant="secondary" className="text-xs">
                        {client._count.interactions} int.
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {client._count.followUps} seg.
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
