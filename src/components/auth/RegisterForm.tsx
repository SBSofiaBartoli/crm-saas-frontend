"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRegister } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });
  const [error, setError] = useState("");
  const register = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await register.mutateAsync({
        ...form,
        phone: form.phone || undefined,
        company: form.company || undefined,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message;
        setError(Array.isArray(msg) ? msg[0] : (msg ?? "Error al registrarse"));
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>
          Completá tus datos para empezar a gestionar tu cartera
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Juan Pérez"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="juan@empresa.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              Contraseña *
              <span className="text-xs text-muted-foreground ml-2">
                mín. 8 caracteres, una mayúscula y un número
              </span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Teléfono
              <span className="text-xs text-muted-foreground ml-2">
                opcional
              </span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+54 9 351 123-4567"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">
              Empresa
              <span className="text-xs text-muted-foreground ml-2">
                opcional
              </span>
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Automotores del Centro S.A."
              value={form.company}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={register.isPending}
          >
            {register.isPending ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Iniciá sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
