// src/components/ui/SocialIcons.tsx
"use client";
import { FC } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "./Link";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  className?: string;
}

export const SocialIcons: FC<SocialIconsProps> = ({ className }) => {
  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
    { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
    { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  ];

  return (
    <div className={cn("flex gap-4", className)}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          variant="icon"
        >
          <Icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};
