import { requireAdmin } from "@/lib/admin-auth";
import ContentGenerator from "@/components/admin/ContentGenerator";

export default async function Page() {
  await requireAdmin();
  return <ContentGenerator />;
}
