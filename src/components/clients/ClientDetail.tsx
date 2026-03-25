"use client";

import { useClient } from "@/hooks/useClients";
import {
  useInteractions,
  useCreateInteraction,
  useDeleteInteraction,
} from "@/hooks/useInteractions";
import {
  useFollowUps,
  useCreateFollowUp,
  useUpdateFollowUp,
  useDeleteFollowUp,
} from "@/hooks/useFollowUps";
import { InteractionList } from "@/components/interactions/InteractionList";
import { InteractionForm } from "@/components/interactions/InteractionForm";
import { FollowUpList } from "@/components/follow-ups/FollowUpList";
import { FollowUpForm } from "@/components/follow-ups/FollowUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Mail, Phone, FileText } from "lucide-react";

interface Props {
  clientId: string;
}

export function ClientDetail({ clientId }: Props) {
  const { data: client, isLoading } = useClient(clientId);
  const { data: interactions = [], isLoading: loadingInteractions } =
    useInteractions(clientId);
  const { data: followUps = [], isLoading: loadingFollowUps } =
    useFollowUps(clientId);

  const createInteraction = useCreateInteraction(clientId);
  const deleteInteraction = useDeleteInteraction(clientId);
  const createFollowUp = useCreateFollowUp(clientId);
  const updateFollowUp = useUpdateFollowUp(clientId);
  const deleteFollowUp = useDeleteFollowUp(clientId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{client.name}</h1>
          {client.company && (
            <p className="text-muted-foreground mt-1">{client.company}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{interactions.length} interacciones</Badge>
          <Badge variant="outline">
            {followUps.filter((f) => !f.completed).length} pendientes
          </Badge>
        </div>
      </div>

      {/* Info del cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Información de contacto</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {client.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-muted-foreground" />
              {client.email}
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-muted-foreground" />
              {client.phone}
            </div>
          )}
          {client.company && (
            <div className="flex items-center gap-2 text-sm">
              <Building2 size={14} className="text-muted-foreground" />
              {client.company}
            </div>
          )}
          {client.notes && (
            <div className="flex items-start gap-2 text-sm col-span-2">
              <FileText size={14} className="text-muted-foreground mt-0.5" />
              {client.notes}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interacciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Historial de interacciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InteractionForm
              onSubmit={(data) => createInteraction.mutate(data)}
              isLoading={createInteraction.isPending}
            />
            <InteractionList
              interactions={interactions}
              isLoading={loadingInteractions}
              onDelete={(id) => deleteInteraction.mutate(id)}
            />
          </CardContent>
        </Card>

        {/* Seguimientos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Seguimientos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FollowUpForm
              onSubmit={(data) => createFollowUp.mutate(data)}
              isLoading={createFollowUp.isPending}
            />
            <FollowUpList
              followUps={followUps}
              isLoading={loadingFollowUps}
              onComplete={(id) =>
                updateFollowUp.mutate({ id, data: { completed: true } })
              }
              onDelete={(id) => deleteFollowUp.mutate(id)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
