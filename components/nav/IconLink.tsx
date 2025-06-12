// components/IconLink.tsx
import { Link } from "../ui/Link";
import { FC } from "react";
import type { IconType } from "react-icons"; // o el tipo adecuado si usas lucide-react

interface IconLinkProps {
  href: string;
  icon: IconType;
  label: string;
  badgeCount?: number; // 👈 nuevo
  className?: string;
}

export const IconLink: FC<IconLinkProps> = ({
  href,
  icon: Icon,
  label,
  badgeCount = 0,
  className = "",
}) => (
  <Link
    href={href}
    aria-label={label}
    variant="icon"
    className={`relative ${className}`}
  >
    <Icon className="w-5 h-5" />
    {badgeCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
        {badgeCount}
      </span>
    )}
  </Link>
);
