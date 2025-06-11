// components/ui/Link.tsx
'use client'

import NextLink from "next/link"
import { FC, ReactNode, MouseEventHandler } from "react"

const variantClasses: Record<string, string> = {
  link: `
    text-[var(--color-text-secondary)] 
    hover:text-[var(--color-accent)] 
    underline underline-offset-8 decoration-[1px] 
    transition-colors duration-200
  `,
  footer: `
    text-[var(--color-accent)] 
    hover:text-[var(--color-bg-light)] 
    transition-colors duration-200 
    text-sm
  `,
  default: `
    text-[var(--color-text-primary)]
    hover:bg-[var(--color-principal)]
    hover:text-[var(--color-text-secondary)] 
    transition-colors duration-300
    cursor-pointer
  `,
  ghost: `
    text-[var(--color-accent)] 
    hover:text-[var(--color-principal)] 
    underline underline-offset-8 decoration-[2px]
    transition-colors duration-200
  `,
  icon: `
    inline-flex items-center justify-center
    w-8 h-8 rounded-full
    bg-[var(--color-accent)]
    text-[var(--color-text-primary)]
    hover:bg-[var(--color-principal)]
    hover:text-[var(--color-text-secondary)]
    transition-all
  `
}

interface LinkProps {
  href: string
  children: ReactNode
  variant?: "link" | "default" | "ghost" | "footer" | "icon"
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  target?: string
  rel?: string
}

export const Link: FC<LinkProps> = ({
  href,
  children,
  variant = "link",
  className = "",
  onClick,
}) => {
  const baseClass = variantClasses[variant] || variantClasses.link

  return (
    <NextLink
      href={href}
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </NextLink>
  )
}
