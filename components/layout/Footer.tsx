'use client'
import { IconType } from "react-icons";
import { FC } from "react";
import { Container } from "../ui/container";
import { Link } from "../ui/Link";
import { SocialIcons } from "../ui/SocialIcons";


interface FooterProps {
  sections: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
  socialLinks?: {
    label: string;
    href: string;
    icon: IconType;
  }[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyright?: string;
}

const Footer: FC<FooterProps> = ({
  sections,
  contactInfo,
  copyright,
}) => {
  return (
    <footer className="bg-[var(--color-principal)] text-[var(--color-text-secondary)] py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h5 className="mb-3">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} variant="footer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {(contactInfo?.email || contactInfo?.phone || contactInfo?.address) && (
            <div>
              <h5 className="mb-3">Contacto</h5>
              <ul className="space-y-2">
                {contactInfo.email && (
                  <li>
                    <Link href={`mailto:${contactInfo.email}`} variant="footer">
                      Email: {contactInfo.email},
                    </Link>

                  </li>
                )}
                {contactInfo.phone &&
                  <li>Tel: {contactInfo.phone}</li>}
                {contactInfo.address &&
                  <li>Dirección: {contactInfo.address}</li>}
              </ul>
            </div>
          )}
          <div>
            <h5 className="mb-3">Síguenos</h5>
            <div className="flex space-x-4">
              <SocialIcons className="mt-4" />
            </div>
          </div>
        </div>
        <hr className="my-8 border-[var(--color-accent)]" />
        <p className="text-center text-sm text-[var(--color-accent)]">
          {copyright}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
