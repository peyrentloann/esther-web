import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Espace Esther — Admin",
};

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / titre */}
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
