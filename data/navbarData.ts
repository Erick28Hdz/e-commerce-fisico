// data/navbarData.ts
interface NavLink {
  label: string
  href: string
}

export const navbarLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Contacto', href: '/contacto' },
]