import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="bg-surface min-h-screen flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-12 max-w-screen-2xl">{children}</main>
    </div>
  );
}
