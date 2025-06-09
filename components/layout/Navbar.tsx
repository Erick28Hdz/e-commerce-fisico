'use client'

import { FC, useState } from 'react'
import { ShoppingCart, User2 } from 'lucide-react'
import { Container } from '../ui/container'
import { Link } from '../ui/Link' // ✅ Usamos SOLO este
import { Logo } from '../nav/Logo'
import { IconLink } from '../nav/IconLink'
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

  // Links en el menú móvil
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
      <Link
        href="/carrito"
        variant="footer"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Carrito
      </Link>
      <Link
        href="/login"
        variant="footer"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Mi cuenta
      </Link>
    </>
  )

  return (
    <header className="border-b bg-principal shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Logo text={logoText} />

          {/* Navegación escritorio */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Iconos y toggle móvil */}
          <div className="flex items-center gap-4">
            {/* Iconos solo en desktop */}
            <div className="hidden md:flex gap-4">
              <IconLink href="/carrito" icon={ShoppingCart} label="Carrito" />
              <IconLink href="/login" icon={User2} label="Cuenta" />
            </div>

            {/* Toggle menú móvil */}
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Menú desplegable móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-2 pb-4">
            {renderMobileMenuItems()}
          </div>
        )}
      </Container>
    </header>
  )
}
