import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      {/* Área principal con scroll interno */}
      <main className="flex-1 h-full overflow-auto bg-gray-50 p-6">
        <div className="w-full max-w-full overflow-x-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
