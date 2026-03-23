"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client } from "@/types";

interface Props {
  initial?: Client;
  onSubmit: (data: Partial<Client>) => void;
  isLoading: boolean;
}

export function ClientForm({ initial, onSubmit, isLoading }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    phone: initial?.phone ?? "",
    company: initial?.company ?? "",
    notes: initial?.notes ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...form,
      email: form.email || undefined,
      phone: form.phone || undefined,
      company: form.company || undefined,
      notes: form.notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo *</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Carlos Rodríguez"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="carlos@gmail.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+54 9 351 555-1234"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Empresa</Label>
        <Input
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Empresa S.A."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notas</Label>
        <Input
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Interesado en financiación..."
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? "Guardando..."
          : initial
            ? "Guardar cambios"
            : "Crear cliente"}
      </Button>
    </form>
  );
}
