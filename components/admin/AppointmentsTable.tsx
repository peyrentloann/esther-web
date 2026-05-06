"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  updateAppointmentStatus,
  deleteAppointment,
} from "@/app/admin/(protected)/rendez-vous/actions";

export type AppointmentRow = {
  id: string;
  starts_at: string;
  duration_min: number;
  service: string;
  format: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  status: "pending" | "confirmed" | "cancelled" | "done";
  google_event_id: string | null;
  created_at: string;
};
type Appointment = AppointmentRow;

const STATUS = {
  pending: { label: "En attente", classes: "bg-tertiary-fixed text-tertiary" },
  confirmed: { label: "Confirmé", classes: "bg-primary-fixed text-primary" },
  done: { label: "Complété", classes: "bg-surface-container-high text-outline" },
  cancelled: { label: "Annulé", classes: "bg-error-container text-error" },
} as const;

const SERVICE_LABEL: Record<string, string> = {
  reiki: "Reiki",
  "soin-hormonal": "Soin Hormonal",
  "demandes-speciales": "Demande spéciale",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("fr-CA", { day: "2-digit", month: "long", year: "numeric" }),
    time: d.toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" }),
  };
}

const FILTERS = ["Tous", "À venir", "Reiki", "Soin Hormonal", "En attente", "Annulés"] as const;
type Filter = (typeof FILTERS)[number];

export default function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = appointments.filter((a) => {
    if (filter === "Tous") return true;
    if (filter === "À venir") return new Date(a.starts_at) > new Date() && a.status !== "cancelled";
    if (filter === "Reiki") return a.service === "reiki";
    if (filter === "Soin Hormonal") return a.service === "soin-hormonal";
    if (filter === "En attente") return a.status === "pending";
    if (filter === "Annulés") return a.status === "cancelled";
    return true;
  });

  const handleStatus = (id: string, status: Appointment["status"]) => {
    setActiveMenu(null);
    startTransition(async () => {
      const res = await updateAppointmentStatus(id, status);
      if (res.ok) toast.success(`Statut mis à jour : ${STATUS[status].label}`);
      else toast.error(res.error || "Erreur");
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Supprimer ce rendez-vous définitivement ?")) return;
    setActiveMenu(null);
    startTransition(async () => {
      const res = await deleteAppointment(id);
      if (res.ok) toast.success("Rendez-vous supprimé");
      else toast.error(res.error || "Erreur");
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-outline">Aucun rendez-vous dans cette catégorie.</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/50 border-b border-outline-variant/10">
                {["Date & Heure", "Cliente", "Service", "Format", "Statut", ""].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs uppercase tracking-widest text-outline font-label">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filtered.map((a) => {
                const { date, time } = formatDate(a.starts_at);
                const status = STATUS[a.status];
                return (
                  <tr key={a.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-medium text-primary text-sm capitalize">{date}</p>
                      <p className="text-xs text-outline">{time}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-medium text-sm">{a.client_name}</p>
                      <p className="text-xs text-outline">{a.client_email}</p>
                      {a.client_phone && <p className="text-xs text-outline">{a.client_phone}</p>}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          a.service === "reiki"
                            ? "bg-primary-fixed text-primary"
                            : a.service === "soin-hormonal"
                            ? "bg-secondary-fixed text-secondary"
                            : "bg-tertiary-fixed text-tertiary"
                        }`}
                      >
                        {SERVICE_LABEL[a.service] ?? a.service}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-0.5 text-[10px] bg-surface-container rounded font-label uppercase tracking-tighter">
                        {a.format === "en-ligne" ? "En ligne" : "Présentiel"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.classes}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === a.id ? null : a.id)}
                        className="text-outline hover:text-primary transition-colors text-lg w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center"
                      >
                        ⋯
                      </button>
                      {activeMenu === a.id && (
                        <div className="absolute right-6 top-12 z-20 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-xl py-2 min-w-[180px]">
                          {a.status !== "confirmed" && (
                            <button
                              onClick={() => handleStatus(a.id, "confirmed")}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors"
                            >
                              ✓ Confirmer
                            </button>
                          )}
                          {a.status !== "done" && (
                            <button
                              onClick={() => handleStatus(a.id, "done")}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors"
                            >
                              ◉ Marquer complété
                            </button>
                          )}
                          {a.status !== "cancelled" && (
                            <button
                              onClick={() => handleStatus(a.id, "cancelled")}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors text-error"
                            >
                              ✕ Annuler
                            </button>
                          )}
                          <div className="my-1 border-t border-outline-variant/10" />
                          <a
                            href={`mailto:${a.client_email}`}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors"
                          >
                            ✉ Envoyer un courriel
                          </a>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors text-error"
                          >
                            🗑 Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
