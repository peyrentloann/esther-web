import { getServiceClient } from "@/lib/supabase";
import SetupNeeded from "@/components/admin/SetupNeeded";

export const dynamic = "force-dynamic";

type Client = {
  email: string;
  name: string;
  phone: string | null;
  totalAppointments: number;
  lastAppointment: string;
  firstAppointment: string;
  services: Set<string>;
};

const SERVICE_LABEL: Record<string, string> = {
  reiki: "Reiki",
  "soin-hormonal": "Soin Hormonal",
  "demandes-speciales": "Demande spéciale",
};

export default async function ClientesPage() {
  type ApptRow = {
    client_email: string;
    client_name: string;
    client_phone: string | null;
    service: string;
    starts_at: string;
  };
  let appointments: ApptRow[] = [];
  let setupErr: string | null = null;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("client_email, client_name, client_phone, service, starts_at")
      .order("starts_at", { ascending: false });
    if (error) setupErr = error.message;
    else appointments = (data ?? []) as ApptRow[];
  } catch (e) {
    setupErr = (e as Error).message;
  }

  if (setupErr) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Clientes</h2>
        </header>
        <SetupNeeded message={setupErr} />
      </>
    );
  }

  // Group by email
  const map = new Map<string, Client>();
  for (const a of appointments) {
    const existing = map.get(a.client_email);
    if (existing) {
      existing.totalAppointments++;
      existing.services.add(a.service);
      if (a.starts_at < existing.firstAppointment) existing.firstAppointment = a.starts_at;
      if (a.starts_at > existing.lastAppointment) existing.lastAppointment = a.starts_at;
    } else {
      map.set(a.client_email, {
        email: a.client_email,
        name: a.client_name,
        phone: a.client_phone,
        totalAppointments: 1,
        firstAppointment: a.starts_at,
        lastAppointment: a.starts_at,
        services: new Set([a.service]),
      });
    }
  }
  const clients = Array.from(map.values()).sort((a, b) =>
    b.lastAppointment.localeCompare(a.lastAppointment),
  );

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-primary mb-2">Clientes</h2>
        <p className="text-outline">{clients.length} cliente{clients.length > 1 ? "s" : ""} au total</p>
      </header>

      {clients.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">🌸</p>
          <p className="text-outline">Pas encore de clientes — elles apparaîtront ici dès le premier rendez-vous.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => {
            const last = new Date(c.lastAppointment).toLocaleDateString("fr-CA", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            return (
              <div
                key={c.email}
                className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_-10px_rgba(21,51,40,0.06)] hover:-translate-y-1 transition-transform duration-400"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary font-serif text-lg">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-primary truncate">{c.name}</h3>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-xs text-outline hover:text-primary transition-colors truncate block"
                    >
                      {c.email}
                    </a>
                    {c.phone && <p className="text-xs text-outline">{c.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Rendez-vous</span>
                    <span className="font-medium text-primary">{c.totalAppointments}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Dernier RDV</span>
                    <span className="font-medium text-primary capitalize">{last}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/10">
                  {Array.from(c.services).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 text-[10px] bg-surface-container rounded font-label uppercase tracking-tighter"
                    >
                      {SERVICE_LABEL[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
