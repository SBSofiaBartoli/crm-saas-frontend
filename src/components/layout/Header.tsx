"use client";

import { getUser } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const user = getUser();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="h-14 border-b flex items-center justify-end px-6 bg-background">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {user?.company ?? "Ejecutivo de ventas"}
          </p>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
