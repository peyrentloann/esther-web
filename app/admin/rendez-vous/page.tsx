import { requireAdmin } from "@/lib/admin-auth";

const RDV_LIST = [
  { id: "1", date: "2026-04-07", time: "14h00", name: "Marie-Soleil T.", email: "mariesoleil@email.com", phone: "450-123-4567", service: "reiki", format: "en-ligne", status: "confirmed" },
  { id: "2", date: "2026-04-08", time: "09h00", name: "Sophie G.", email: "sophie@email.com", phone: "450-234-5678", service: "soin-hormonal", format: "presentiel", status: "confirmed" },
  { id: "3", date: "2026-04-10", time: "11h00", name: "Isabelle B.", email: "isabelle@email.com", phone: "450-345-6789", service: "reiki", format: "en-ligne", status: "confirmed" },
  { id: "4", date: "2026-04-03", time: "14h00", name: "Catherine M.", email: "catherine@email.com", phone: "450-456-7890", service: "soin-hormonal", format: "presentiel", status: "completed" },
  { id: "5", date: "2026-04-01", time: "10h00", name: "Annie B.", email: "annie@email.com", phone: "450-567-8901", service: "reiki", format: "en-ligne", status: "payment-sent" },
];

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  confirmed: { label: "Confirmé", classes: "bg-primary-fixed text-primary" },
  completed: { label: "Complété", classes: "bg-surface-container-high text-outline" },
  cancelled: { label: "Annulé", classes: "bg-error-container text-error" },
  "payment-sent": { label: "Paiement envoyé", classes: "bg-tertiary-fixed text-tertiary" },
};

const FILTERS = ["Tous", "Reiki", "Soin Hormonal", "Présentiel", "En ligne", "Complétés"];

export default async function AdminRendezVous() {
  await requireAdmin();

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-primary mb-2">Rendez-vous</h2>
        <p className="text-outline">{RDV_LIST.length} rendez-vous au total</p>
      </header>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-8">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              i === 0
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container/50 border-b border-outline-variant/10">
              {["Date & Heure", "Cliente", "Service", "Format", "Statut", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-xs uppercase tracking-widest text-outline font-label">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {RDV_LIST.map((rdv) => {
              const status = STATUS_LABELS[rdv.status];
              return (
                <tr key={rdv.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-medium text-primary text-sm">{rdv.date}</p>
                    <p className="text-xs text-outline">{rdv.time}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-medium text-sm">{rdv.name}</p>
                    <p className="text-xs text-outline">{rdv.email}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        rdv.service === "reiki"
                          ? "bg-primary-fixed text-primary"
                          : "bg-secondary-fixed text-secondary"
                      }`}
                    >
                      {rdv.service === "reiki" ? "Reiki" : "Soin Hormonal"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 text-[10px] bg-surface-container rounded font-label uppercase tracking-tighter">
                      {rdv.format === "en-ligne" ? "En ligne" : "Présentiel"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.classes}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {rdv.status === "completed" && (
                        <button className="text-xs bg-tertiary-fixed text-tertiary px-3 py-1.5 rounded-full hover:bg-tertiary-fixed-dim transition-colors font-medium">
                          Envoyer paiement
                        </button>
                      )}
                      <button className="text-outline hover:text-primary transition-colors text-lg">⋯</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
