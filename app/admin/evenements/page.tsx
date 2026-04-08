import { requireAdmin } from "@/lib/admin-auth";
import EventsManager from "@/components/admin/EventsManager";

export default async function AdminEvenements() {
  await requireAdmin();
  return <EventsManager />;
}
