import AdminOverview from "@/components/dashboard/AdminOverview";
import { DASHBOARD_CONFIG } from "@/data/dashboardNav";
export default function AdminPage() {
  return <AdminOverview config={DASHBOARD_CONFIG.admin} />;
}
