// components/Layout.tsx
import Footer from './Footer';
import { Navbar } from './Navbar';
import { Container } from '../ui/container'; // Asegúrate de importar el Container
import {
  footerSections,
  contactInfo,
  copyright,
} from "../../data/footerData";
import { navbarLinks } from '../../data/navbarData';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar links={navbarLinks} logoText="SuperTienda" />
      <main className="py-8">
        <Container>
          {children}
        </Container>
      </main>
      <Footer
        sections={footerSections}
        contactInfo={contactInfo}
        copyright={copyright}
      />
    </>
  );
}
