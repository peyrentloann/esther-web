import { getServiceClient } from "@/lib/supabase";
import AppointmentsTable, {
  type AppointmentRow,
} from "@/components/admin/AppointmentsTable";
import SetupNeeded from "@/components/admin/SetupNeeded";

export const dynamic = "force-dynamic";

export default async function AdminRendezVous() {
  let appointments: AppointmentRow[] = [];
  let setupErr: string | null = null;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("starts_at", { ascending: false });
    if (error) setupErr = error.message;
    else appointments = (data ?? []) as AppointmentRow[];
  } catch (e) {
    setupErr = (e as Error).message;
  }

  if (setupErr) {
    return (
      <>
        <header className="mb-12">
          <h2 className="font-serif text-4xl text-primary mb-2">Rendez-vous</h2>
        </header>
        <SetupNeeded message={setupErr} />
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
