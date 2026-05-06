import Link from "next/link";
import { getServiceClient } from "@/lib/supabase";
import { isGoogleConnected } from "@/lib/google-calendar";
import SetupNeeded from "@/components/admin/SetupNeeded";

export const dynamic = "force-dynamic";

const SERVICE_LABEL: Record<string, { label: string; classes: string }> = {
  reiki: { label: "Reiki", classes: "bg-primary-fixed text-primary" },
  "soin-hormonal": { label: "Soin Hormonal", classes: "bg-secondary-fixed text-secondary" },
  "demandes-speciales": { label: "Demande spéciale", classes: "bg-tertiary-fixed text-tertiary" },
};

export default async function Dashboard() {
  const now = new Date();
  const today = now.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let supabase;
  try {
    supabase = getServiceClient();
  } catch (e) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Bonjour Esther 👋</h2>
          <p className="text-outline capitalize">{today}</p>
        </header>
        <SetupNeeded message={(e as Error).message} />
      </>
    );
  }

  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [weekRes, pendingRes, clientsRes, upcomingRes] = await Promise.all([
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("starts_at", now.toISOString())
      .lte("starts_at", weekFromNow.toISOString())
      .neq("status", "cancelled"),
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("appointments")
      .select("client_email", { count: "exact", head: true })
      .gte("created_at", monthAgo.toISOString()),
    supabase
      .from("appointments")
      .select("*")
      .gte("starts_at", now.toISOString())
      .neq("status", "cancelled")
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  // If table doesn't exist (or any error), show setup screen
  if (weekRes.error || upcomingRes.error) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Bonjour Esther 👋</h2>
          <p className="text-outline capitalize">{today}</p>
        </header>
        <SetupNeeded message={weekRes.error?.message || upcomingRes.error?.message} />
      </>
    );
  }

  const googleOk = await isGoogleConnected();
  const upcoming = upcomingRes.data ?? [];

  const stats = [
    { label: "RDV cette semaine", value: weekRes.count ?? 0, icon: "📅" },
    { label: "En attente de confirmation", value: pendingRes.count ?? 0, icon: "⏳" },
    { label: "Nouvelles clientes (30j)", value: clientsRes.count ?? 0, icon: "👥" },
    {
      label: "Google Calendar",
      value: googleOk ? "✓" : "⚠",
      icon: "🔗",
      sub: googleOk ? "Connecté" : "Non connecté",
    },
  ];

  return (
    <>
      <header className="flex justify-between items-center mb-16">
        <div>
          <h2 className="font-serif text-4xl text-primary mb-2">Bonjour Esther 👋</h2>
          <p className="text-outline capitalize">{today}</p>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] hover:-translate-y-1 transition-transform duration-400"
          >
            <div className="p-3 bg-surface-container rounded-xl text-xl inline-block mb-6">
              {s.icon}
            </div>
            <p className="text-4xl font-serif text-primary mb-1">{s.value}</p>
            <p className="text-sm text-outline">{s.label}</p>
            {s.sub && <p className="text-xs text-outline/70 mt-1 italic">{s.sub}</p>}
          </div>
        ))}
      </section>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-serif text-2xl text-primary">Prochains rendez-vous</h3>
            <Link
              href="/admin/rendez-vous"
              className="text-sm uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              Voir tout →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 text-center">
              <p className="text-4xl mb-3">🌿</p>
              <p className="text-outline">Aucun rendez-vous à venir.</p>
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container/50 border-b border-outline-variant/10">
                    {["Date & Heure", "Cliente", "Service"].map((h) => (
                      <th key={h} className="px-8 py-4 text-xs uppercase tracking-widest text-outline font-label">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {upcoming.map((rdv) => {
                    const d = new Date(rdv.starts_at);
                    const date = d.toLocaleDateString("fr-CA", {
                      day: "2-digit",
                      month: "long",
                    });
                    const time = d.toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" });
                    const svc = SERVICE_LABEL[rdv.service] ?? { label: rdv.service, classes: "" };
                    return (
                      <tr key={rdv.id} className="hover:bg-surface-container/30 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-medium text-primary capitalize">{date}</p>
                          <p className="text-xs text-outline">{time}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-medium">{rdv.client_name}</p>
                          <span className="px-2 py-0.5 text-[10px] bg-surface-container rounded font-label uppercase tracking-tighter">
                            {rdv.format === "en-ligne" ? "En ligne" : "Présentiel"}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${svc.classes}`}>
                            {svc.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <h3 className="font-serif text-2xl text-primary">Actions rapides</h3>
          <Link
            href="/admin/rendez-vous"
            className="block bg-primary rounded-2xl p-6 text-on-primary hover:scale-[1.02] transition-transform"
          >
            <p className="text-xs uppercase tracking-widest text-on-primary/60 mb-2">Rendez-vous</p>
            <p className="font-serif text-xl">Gérer les RDV →</p>
          </Link>
          <Link
            href="/admin/contenu"
            className="block bg-secondary rounded-2xl p-6 text-on-secondary hover:scale-[1.02] transition-transform"
          >
            <p className="text-xs uppercase tracking-widest text-on-secondary/60 mb-2">Contenu IA</p>
            <p className="font-serif text-xl">Générer du contenu →</p>
          </Link>
          <Link
            href="/admin/parametres"
            className="block bg-surface-container-lowest rounded-2xl p-6 hover:-translate-y-1 transition-transform"
          >
            <p className="text-xs uppercase tracking-widest text-outline mb-2">Intégrations</p>
            <p className="font-serif text-xl text-primary">Paramètres →</p>
          </Link>
        </div>
      </div>
    </>
  );
}
