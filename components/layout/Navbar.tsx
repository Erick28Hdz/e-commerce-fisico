'use client'

import { FC, useState } from 'react'
import { useSesion } from '@/contexts/SesionContext'
import { useCarrito } from '@/contexts/CarritoContext' // 👈 nuevo import
import { ShoppingCart, User2 } from 'lucide-react'
import { Container } from '../ui/container'
import { Link } from '../ui/Link'
import { Logo } from '../nav/Logo'
import { IconLink } from '../nav/IconLink'
import { Dropdown } from '../ui/Dropdown'
import { MobileMenuToggle } from '../nav/MobileMenuToggle'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  links: NavLink[]
  logoText?: string
}

export const Navbar: FC<NavbarProps> = ({ links, logoText }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { usuario, logout } = useSesion()
  const { carrito } = useCarrito() // 👈 accedemos al carrito

  // Calculamos la cantidad total
  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const renderMobileMenuItems = () => (
    <>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          variant="link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}

      <Link href="/carrito" variant="footer" onClick={() => setIsMobileMenuOpen(false)}>
        Carrito ({cantidadTotal})
      </Link>

      {!usuario ? (
        <Link href="/login" variant="footer" onClick={() => setIsMobileMenuOpen(false)}>
          Mi cuenta
        </Link>
      ) : (
        <>
          <span className="text-white text-sm px-2">{usuario.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-600 transition px-2"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </>
  )

  return (
    <header className="border-b bg-principal shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Logo text={logoText} />

          {/* Menú escritorio */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Iconos + sesión */}
          <div className="flex items-center gap-4">
            {/* Íconos solo en escritorio */}
            <div className="hidden md:flex gap-4 items-center">
              <IconLink
                href="/carrito"
                icon={ShoppingCart}
                label="Carrito"
                badgeCount={cantidadTotal} // 👈 lo pasamos aquí
              />

              {!usuario ? (
                <IconLink href="/login" icon={User2} label="Cuenta" />
              ) : (
                <div className="relative group">
                  <Dropdown
                    trigger={
                      <div className="flex items-center gap-2 text-accent hover:text-principal transition-colors cursor-pointer">
                        <User2 size={22} />
                        <span className="text-base font-medium">{usuario.nombre}</span>
                      </div>
                    }
                  >
                    <div className="px-4 py-2 text-sm border-b">{usuario.email}</div>
                    <Dropdown.Item href="/usuarios/perfil">Mi perfil</Dropdown.Item>
                    <Dropdown.Item href="/usuarios/notificaciones">Notificaciones</Dropdown.Item>
                    <Dropdown.Item onClick={logout} danger>
                      Cerrar sesión
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              )}
            </div>

            {/* Botón menú móvil */}
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-2 pb-4">
            {renderMobileMenuItems()}
          </div>
        )}
      </Container>
    </header>
  )
}
