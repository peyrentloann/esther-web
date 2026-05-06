import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Espace Esther — Admin",
};

export default async function AdminLogin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  if (token && token.value === process.env.ADMIN_PIN) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-3xl italic text-primary mb-2">Esther Laframboise</p>
          <p className="text-xs uppercase tracking-[0.2em] text-outline">Espace administrateur</p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-outline mt-8">
          Accès réservé — Esther Laframboise
        </p>
      </div>
    </div>
  );
}
