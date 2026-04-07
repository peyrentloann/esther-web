import { requireAdmin } from "@/lib/admin-auth";
export default async function Page() {
  await requireAdmin();
  return <p className="text-outline font-serif italic text-2xl pt-20 text-center">Bientôt disponible</p>;
}
