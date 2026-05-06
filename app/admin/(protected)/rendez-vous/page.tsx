import { getServiceClient } from "@/lib/supabase";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import SetupNeeded from "@/components/admin/SetupNeeded";

export const dynamic = "force-dynamic";

export default async function AdminRendezVous() {
  let supabase;
  try {
    supabase = getServiceClient();
  } catch (e) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Rendez-vous</h2>
        </header>
        <SetupNeeded message={(e as Error).message} />
      </>
    );
  }

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Rendez-vous</h2>
        </header>
        <SetupNeeded message={error.message} />
      </>
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
