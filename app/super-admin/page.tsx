import AdminOverview from "@/components/dashboard/AdminOverview";
import { DASHBOARD_CONFIG } from "@/data/dashboardNav";
export default function SuperAdminPage() {
  return <AdminOverview config={DASHBOARD_CONFIG.super_admin} />;
}
