"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Client } from "@/types";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export function ClientTable({ clients, isLoading, onEdit, onDelete }: Props) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No hay clientes registrados todavía.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Empresa</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Actividad</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>
              <div>
                <p className="font-medium">{client.name}</p>
                {client.email && (
                  <p className="text-xs text-muted-foreground">
                    {client.email}
                  </p>
                )}
              </div>
            </TableCell>
            <TableCell>
              {client.company ?? (
                <span className="text-muted-foreground text-xs">—</span>
              )}
            </TableCell>
            <TableCell>
              {client.phone ?? (
                <span className="text-muted-foreground text-xs">—</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {client._count && (
                  <>
                    <Badge variant="secondary">
                      {client._count.interactions} interacciones
                    </Badge>
                    <Badge variant="outline">
                      {client._count.followUps} seguimientos
                    </Badge>
                  </>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/clients/${client.id}`)}
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(client)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(client)}
                  className="hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
