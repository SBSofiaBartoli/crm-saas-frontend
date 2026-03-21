import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">CRM SaaS</h1>
          <p className="text-muted-foreground mt-2">
            Gestión de cartera de clientes
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
