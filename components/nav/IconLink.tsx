import { Link } from "../ui/Link";
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
    variant="icon"
  >
    <Icon className="w-5 h-5" />
  </Link>
);
