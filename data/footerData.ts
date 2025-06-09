import { Facebook, Twitter, Instagram } from "lucide-react";
import React from "react";


export const footerSections = [
    {
        title: "Empresa",
        links: [
            { label: "Nosotros", href: "/nosotros" },
            { label: "Carreras", href: "/carreras" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Soporte",
        links: [
            { label: "Contacto", href: "/contacto" },
            { label: "FAQs", href: "/faqs" },
            { label: "Términos y condiciones", href: "/terminos" },
        ],
    },
];

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export const contactInfo = {
    email: "contacto@tuempresa.com",
    phone: "+52 55 1234 5678",
    address: "Calle Falsa 123, Ciudad, País",
};

export const copyright = `© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.`;
