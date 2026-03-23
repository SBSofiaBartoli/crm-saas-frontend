"use client";

import { useState } from "react";
import {
  useClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
} from "@/hooks/useClients";
import { ClientTable } from "./ClientTable";
import { ClientForm } from "./ClientForm";
import { ImportModal } from "./ImportModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Client } from "@/types";
import { Plus, Upload, Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export function ClientsView() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const debouncedSearch = useDebounce(search, 400);
  const { data: clients = [], isLoading } = useClients(debouncedSearch);
  const createClient = useCreateClient();
  const updateClient = useUpdateClient(editingClient?.id ?? "");
  const deleteClient = useDeleteClient();

  const handleSubmit = async (data: Partial<Client>) => {
    if (editingClient) {
      await updateClient.mutateAsync(data);
    } else {
      await createClient.mutateAsync(data);
    }
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deletingClient) return;
    await deleteClient.mutateAsync(deletingClient.id);
    setDeletingClient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Clientes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {clients.length} cliente{clients.length !== 1 ? "s" : ""} registrado
            {clients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowImport(true)}
          >
            <Upload size={16} />
            Importar
          </Button>
          <Button
            className="gap-2"
            onClick={() => {
              setEditingClient(null);
              setShowForm(true);
            }}
          >
            <Plus size={16} />
            Nuevo cliente
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <Input
          placeholder="Buscar por nombre, email o empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border bg-background">
        <ClientTable
          clients={clients}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={setDeletingClient}
        />
      </div>

      <Dialog
        open={showForm}
        onOpenChange={(open: boolean) => {
          setShowForm(open);
          if (!open) setEditingClient(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Editar cliente" : "Nuevo cliente"}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            key={editingClient?.id ?? "new"}
            initial={editingClient ?? undefined}
            onSubmit={handleSubmit}
            isLoading={createClient.isPending || updateClient.isPending}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingClient}
        onOpenChange={(open: boolean) => {
          if (!open) setDeletingClient(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a eliminar a <strong>{deletingClient?.name}</strong>. Esta
              acción no se puede deshacer y borrará todas sus interacciones y
              seguimientos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ImportModal open={showImport} onClose={() => setShowImport(false)} />
    </div>
  );
}
