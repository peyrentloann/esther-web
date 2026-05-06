import { getServiceClient } from "@/lib/supabase";
import AppointmentsTable from "@/components/admin/AppointmentsTable";

export const dynamic = "force-dynamic";

export default async function AdminRendezVous() {
  const supabase = getServiceClient();
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) {
    return (
      <div className="bg-error-container text-error p-8 rounded-2xl">
        <h2 className="font-bold mb-2">Erreur de chargement</h2>
        <p className="text-sm">{error.message}</p>
        <p className="text-xs mt-4 opacity-70">
          Tip : vérifie que la migration <code>supabase/0001_init.sql</code> a été exécutée dans Supabase.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-primary mb-2">Rendez-vous</h2>
        <p className="text-outline">{appointments?.length ?? 0} rendez-vous au total</p>
      </header>

      <AppointmentsTable appointments={appointments ?? []} />
    </>
  );
}
