"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImportClients } from "@/hooks/useClients";
import { Upload, FileSpreadsheet } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ImportModal({ open, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    imported: number;
    errors: { row: number; reason: string }[];
    message: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const importClients = useImportClients();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setResult(null);
  };

  const handleImport = async () => {
    if (!file) return;
    try {
      const res = await importClients.mutateAsync(file);
      setResult(res);
    } catch {
      setResult({
        imported: 0,
        errors: [],
        message: "Error al procesar el archivo",
      });
    }
  };

  const handleClose = () => {
    setFile(null);
    setResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar clientes</DialogTitle>
          <DialogDescription>
            Subí un archivo CSV o Excel con columnas: name, email, phone,
            company, notes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <FileSpreadsheet
              className="mx-auto mb-2 text-muted-foreground"
              size={32}
            />
            <p className="text-sm text-muted-foreground">
              {file ? file.name : "Hacé click para seleccionar un archivo"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CSV o Excel — máx. 5MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          {result && (
            <div className="rounded-md border p-4 space-y-2">
              <p className="text-sm font-medium">{result.message}</p>
              {result.errors.length > 0 && (
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {result.errors.map((err, i) => (
                    <p key={i} className="text-xs text-destructive">
                      Fila {err.row}: {err.reason}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleImport}
              disabled={!file || importClients.isPending}
            >
              <Upload size={16} />
              {importClients.isPending ? "Importando..." : "Importar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
