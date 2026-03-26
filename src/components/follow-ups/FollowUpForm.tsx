"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onSubmit: (data: { description: string; dueDate: string }) => void;
  isLoading: boolean;
}

export function FollowUpForm({ onSubmit, isLoading }: Props) {
  const [form, setForm] = useState({
    description: "",
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      description: form.description,
      dueDate: new Date(form.dueDate).toISOString(),
    });
    setForm({ description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          placeholder="Llamar para confirmar visita..."
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dueDate">Fecha límite</Label>
        <Input
          id="dueDate"
          type="datetime-local"
          value={form.dueDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Agregar seguimiento"}
      </Button>
    </form>
  );
}
