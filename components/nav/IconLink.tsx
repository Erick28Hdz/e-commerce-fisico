import Link from "next/link";
import { FC } from "react";
import type { IconType } from "react-icons"; 

interface IconLinkProps {
  href: string;
  icon: IconType; 
  label: string;
  className?: string;
}

export const IconLink: FC<IconLinkProps> = ({
  href,
  icon: Icon,
  label,
  className,
}) => (
  <Link
    href={href}
    aria-label={label}
    className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-text-primary)] hover:bg-[var(--color-principal)] hover:text-[var(--color-text-secondary)] transition-all ${className || ""}`}
  >
    <Icon className="w-5 h-5" />
  </Link>
);
