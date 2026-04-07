import { requireAdmin } from "@/lib/admin-auth";

const STATS = [
  { label: "Rendez-vous cette semaine", value: "12", icon: "📅", hoverBg: "hover:bg-primary", hoverText: "hover:text-on-primary" },
  { label: "Prochains événements", value: "3", icon: "✨", hoverBg: "hover:bg-tertiary", hoverText: "hover:text-on-tertiary" },
  { label: "Nouvelles clientes", value: "8", icon: "👥", hoverBg: "hover:bg-secondary", hoverText: "hover:text-on-secondary" },
  { label: "Journal — liste d'attente", value: "15", icon: "📖", hoverBg: "hover:bg-tertiary-container", hoverText: "hover:text-on-primary" },
];

const UPCOMING_RDV = [
  { date: "7 Avril", time: "14h00 — 15h30", name: "Marie-Soleil T.", format: "En ligne", service: "Reiki", serviceColor: "bg-primary-fixed text-primary" },
  { date: "8 Avril", time: "09h00 — 10h30", name: "Sophie G.", format: "Présentiel", service: "Soin Hormonal", serviceColor: "bg-secondary-fixed text-secondary" },
  { date: "10 Avril", time: "11h00 — 12h30", name: "Isabelle B.", format: "En ligne", service: "Reiki", serviceColor: "bg-primary-fixed text-primary" },
];

export default async function Dashboard() {
  await requireAdmin();

  const today = new Date().toLocaleDateString("fr-CA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div>
          <h2 className="font-serif text-4xl text-primary mb-2">Bonjour Esther 👋</h2>
          <p className="text-outline capitalize">{today}</p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {STATS.map((s) => (
          <div
            key={s.label}
            className={`bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] group transition-all duration-400 ${s.hoverBg}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-surface-container rounded-xl text-xl group-hover:bg-white/10 transition-colors">
                {s.icon}
              </div>
            </div>
            <p className={`text-4xl font-serif text-primary mb-1 ${s.hoverText} group-hover:text-white`}>
              {s.value}
            </p>
            <p className={`text-sm text-outline group-hover:text-white/70`}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Contenu principal */}
      <div className="grid grid-cols-12 gap-12">
        {/* Table RDV */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-serif text-2xl text-primary">Rendez-vous à venir</h3>
            <a
              href="/admin/rendez-vous"
              className="text-sm uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              Voir tout →
            </a>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container/50 border-b border-outline-variant/10">
                  {["Date & Heure", "Cliente", "Service", "Action"].map((h) => (
                    <th key={h} className="px-8 py-4 text-xs uppercase tracking-widest text-outline font-label">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {UPCOMING_RDV.map((rdv) => (
                  <tr key={rdv.name} className="hover:bg-surface-container/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-medium text-primary">{rdv.date} 2026</p>
                      <p className="text-xs text-outline">{rdv.time}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-medium">{rdv.name}</p>
                      <span className="px-2 py-0.5 text-[10px] bg-surface-container rounded font-label uppercase tracking-tighter">
                        {rdv.format}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${rdv.serviceColor}`}>
                        {rdv.service}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-primary hover:opacity-50 transition-opacity text-xl">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prochain événement */}
        <div className="col-span-12 lg:col-span-4">
          <h3 className="font-serif text-2xl text-primary mb-8">Prochain événement</h3>
          <div className="bg-primary rounded-2xl p-8 text-on-primary space-y-4">
            <span className="text-xs uppercase tracking-widest text-on-primary/50">Retraite</span>
            <h4 className="font-serif text-xl">Retraite Soin de soi — Printemps</h4>
            <div className="space-y-2 text-sm text-on-primary/70">
              <p>📅 15 Avril 2026</p>
              <p>📍 Shefford, QC</p>
              <p>👥 8 / 12 places réservées</p>
            </div>
            <div className="w-full bg-on-primary/10 rounded-full h-1.5 mt-2">
              <div className="bg-tertiary-fixed-dim h-1.5 rounded-full" style={{ width: "66%" }} />
            </div>
            <a
              href="/admin/evenements"
              className="inline-block text-xs text-tertiary-fixed-dim hover:text-tertiary-fixed transition-colors mt-2"
            >
              Gérer les événements →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
