// src/app/page.tsx
"use client";
import Head from "next/head";
import HeroBanner from "@/components/inicio/HeroBanner";
import ProductosMasVendidos from "@/components/productos/detallado/secciones/ProductosMasVendidos";
import ServicesSection from "@/components/inicio/ServicesSection";
import HeroCarrusel from "@/components/ui/HeroBanners";
import PromoBanner from "@/components/inicio/PromoBanner";
import Newsletter from "@/components/inicio/Newsletter";
import FooterBanner from "@/components/inicio/FooterBanner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | SuperTienda</title>
      </Head>

      {/* Hero principal */}
      <HeroBanner />

      {/* Promoción intermedia */}
      <div className="my-12">
        <PromoBanner />
      </div>

      {/* Productos más vendidos */}
      <section className="my-16 px-6 lg:px-16">
        <ProductosMasVendidos />
      </section>

      {/* Carrusel de productos u ofertas */}
      <section className="my-16">
        <HeroCarrusel />
      </section>

      {/* Newsletter con fondo claro */}
      <section className=" mx-5 my-20 bg-[var(--color-bg-secondary)] px-10 py-10 rounded-lg shadow-md gap-2">
        <ServicesSection />
        <Newsletter />
      </section>
      {/* Banner final llamativo */}
      <FooterBanner />
    </>
  );
}



