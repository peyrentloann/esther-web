"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/admin/actions";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: "📅", label: "Tableau de bord" },
  { href: "/admin/rendez-vous", icon: "🗓", label: "Rendez-vous" },
  { href: "/admin/evenements", icon: "✨", label: "Événements" },
  { href: "/admin/contenu", icon: "🤖", label: "Contenu IA" },
  { href: "/admin/clientes", icon: "👥", label: "Clientes" },
  { href: "/admin/parametres", icon: "⚙️", label: "Paramètres" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-primary text-on-primary flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="mb-12">
        <h1 className="font-serif text-xl text-primary-fixed italic">Esther Laframboise</h1>
        <p className="text-xs uppercase tracking-widest text-on-primary/50 mt-1">Admin</p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 text-sm font-medium ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-primary/50 hover:bg-white/5 hover:text-on-primary"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-on-primary/40 hover:text-on-primary transition-colors text-sm"
        >
          <span>↗</span>
          <span>Voir le site</span>
        </Link>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-secondary-fixed-dim hover:text-secondary-fixed transition-colors text-xs uppercase tracking-wider mt-1"
          >
            <span>⎋</span>
            <span>Déconnexion</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
