// data/navbarData.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface IconNavLink {
  label: string;
  href: string;
  icon: any; // Puede usar el tipo `LucideIcon` si quieres tipado estricto
}

import { ShoppingCart, User2 } from 'lucide-react';

export const navbarLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Productos', href: '/productos' },
  { label: 'Contacto', href: '/contacto' },
];

export const iconNavbarLinks: IconNavLink[] = [
  { label: 'Carrito', href: '/carrito', icon: ShoppingCart },
  { label: 'Cuenta', href: '/login', icon: User2 },
];
