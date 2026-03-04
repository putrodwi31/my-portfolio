import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminDashboardData } from "@/lib/admin-data";

export default async function AdminPage() {
  const data = await getAdminDashboardData();

  return <AdminDashboard initialData={data} />;
}
