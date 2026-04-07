import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface min-h-screen flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-12 max-w-screen-2xl">{children}</main>
    </div>
  );
}
