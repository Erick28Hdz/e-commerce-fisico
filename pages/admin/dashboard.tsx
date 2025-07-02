import AdminLayout from '@/components/admin/AdminLayout'
import { Overview } from '@/components/admin/Overview'
import { BestSellers } from '@/components/admin/BestSellers'
import { RecentOrders } from '@/components/admin/RecentOrders'
import { NewUsers } from '@/components/admin/NewUsers'
import { SalesChart } from '@/components/admin/SalesChart'

export default function DashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard de Administrador</h1>
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BestSellers />
        <NewUsers />
      </div>
      <SalesChart />
      <RecentOrders />
    </AdminLayout>
  )
}
