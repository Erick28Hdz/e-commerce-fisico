// components/admin/AdminSidebar.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminSidebar = () => {
  const router = useRouter()

  const links = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Usuarios', href: '/admin/usuarios' },
    { label: 'Productos', href: '/admin/productos/productos' },
    { label: 'Pedidos', href: '/admin/pedidos' },
    { label: 'Inventario', href: '/admin/inventario' },
    { label: 'Facturación', href: '/admin/facturacion' },
  ]

  return (
    <aside className="w-64 bg-white border-r min-h-screen
     px-2 py-2 space-y-4 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Panel Admin</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md hover:bg-gray-100 transition ${
              router.pathname === link.href ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
