import Head from "next/head";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { productosMock } from "@/data/productosMock";
import SidebarCategorias from "@/components/productos/sidebar/SidebarCategorias";
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import Paginacion from "@/components/ui/Paginacion";
import HeroCarrusel from "@/components/ui/HeroBanners";
import PromoBanner from "@/components/inicio/PromoBanner";

const PRODUCTOS_POR_PAGINA = 9;

export default function ProductosPage() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtros, setFiltros] = useState({
    precioMin: "",
    precioMax: "",
    rating: 0,
    soloEnStock: false,
    tienePromocion: false,
    tieneDescuento: false,
    descuentoMin: "",
    descuentoMax: "",
  });

  const router = useRouter();
  const { categoria } = router.query;

  const categoriaNormalizada = !categoria || categoria === "Todos" ? "Todos" : categoria;

  // Resetear a página 1 si cambia la categoría o filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [categoria, filtros]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    let productos = !categoria || categoria === "Todos" || typeof categoria !== "string"
      ? productosMock
      : productosMock.filter((p) => p.categoria === categoria);

    productos = productos.filter((producto) => {
      const {
        precioMin,
        precioMax,
        rating,
        soloEnStock,
        tienePromocion,
        tieneDescuento,
        descuentoMin,
        descuentoMax,
      } = filtros;

      if (precioMin !== "" && producto.precio < Number(precioMin)) return false;
      if (precioMax !== "" && producto.precio > Number(precioMax)) return false;

      if (rating > 0 && (!producto.puntuacion || producto.puntuacion < rating)) return false;

      if (soloEnStock && producto.stock <= 0) return false;

      if (tienePromocion && !producto.mensaje?.toLowerCase().includes("promo")) return false;

      if (tieneDescuento && (!producto.descuento || producto.descuento <= 0)) return false;

      if (descuentoMin !== "" && (!producto.descuento || producto.descuento < Number(descuentoMin))) return false;
      if (
        descuentoMax !== "" &&
        (
          producto.descuento === undefined || producto.descuento > Number(descuentoMax)
        )
      ) return false;

      return true;
    });

    return productos;
  }, [categoria, filtros]);

  // Paginación
  const indiceUltimoProducto = paginaActual * PRODUCTOS_POR_PAGINA;
  const indicePrimerProducto = indiceUltimoProducto - PRODUCTOS_POR_PAGINA;
  const productosPaginados = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

  const manejarCambioPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return (
    <>
      <Head>
        <title>Productos | SuperTienda</title>
      </Head>
      <HeroCarrusel /> {/* Aquí agregas el hero */}
      <div className="flex gap-8">
        <SidebarCategorias onFiltrar={setFiltros} />

        <main className="flex-1">
          <h2 className="mb-2 text-center text-[var(--color-principal)] ">
            {categoriaNormalizada === "Todos"
              ? "Nuestros productos"
              : categoriaNormalizada}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosPaginados.map((producto) => (
              <ProductoCard
                key={producto.id}
                id={producto.id}
                slug={producto.slug}
                nombre={producto.nombre}
                imagen={producto.imagen}
                precio={producto.precio}
                precioAntiguo={producto.precioAntiguo}
                descuento={producto.descuento}
                mensaje={producto.mensaje}
              />
            ))}
          </div>

          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={manejarCambioPagina}
          />
        </main>
      </div>
      <div className="mt-6">
        <PromoBanner />
      </div>
    </>
  );
}

