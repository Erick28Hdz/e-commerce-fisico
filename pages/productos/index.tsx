import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import SidebarCategorias from "@/components/productos/sidebar/SidebarCategorias";
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import Paginacion from "@/components/ui/Paginacion";
import HeroCarrusel from "@/components/ui/HeroBanners";
import PromoBanner from "@/components/inicio/PromoBanner";

const PRODUCTOS_POR_PAGINA = 9;

interface Producto {
  puntuacion: any;
  id: string;
  nombre: string;
  slug: string;
  referencia: string;
  descripcion: string;
  precio: number;
  precioAntiguo?: number;
  descuento?: number;
  mensaje?: string;
  imagen: string;
  imagenesSecundarias?: string[];
  stock: number;
  variantes: string[];
  color: string;
  categoria: string;
  tiempoEnvioDias?: number;
  ubicacion?: string;
  limiteStockVisible?: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
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
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { categoria } = router.query;

  const categoriaNormalizada = !categoria || categoria === "Todos" ? "Todos" : categoria;

  // Fetch desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/productos?categoria=${categoriaNormalizada}`);
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  // Resetear a página 1 si cambia la categoría o filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [categoria, filtros]);

  // Filtrar productos localmente (por stock, descuentos, etc)
  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
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

      if (precioMin && producto.precio < Number(precioMin)) return false;
      if (precioMax && producto.precio > Number(precioMax)) return false;
      if (rating > 0 && (!producto.puntuacion || producto.puntuacion < rating)) return false;
      if (soloEnStock && producto.stock <= 0) return false;
      if (tienePromocion && !producto.mensaje?.toLowerCase().includes("promo")) return false;
      if (tieneDescuento && (!producto.descuento || producto.descuento <= 0)) return false;
      if (descuentoMin && (!producto.descuento || producto.descuento < Number(descuentoMin))) return false;
      if (descuentoMax && (producto.descuento === undefined || producto.descuento > Number(descuentoMax))) return false;

      return true;
    });
  }, [productos, filtros]);

  // Paginación
  const indiceUltimoProducto = paginaActual * PRODUCTOS_POR_PAGINA;
  const indicePrimerProducto = indiceUltimoProducto - PRODUCTOS_POR_PAGINA;
  const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
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

      <HeroCarrusel />

      <div className="flex gap-8">
        <SidebarCategorias onFiltrar={setFiltros} />

        <main className="flex-1">
          <h2 className="mb-2 text-center text-[var(--color-principal)]">
            {categoriaNormalizada === "Todos"
              ? "Nuestros productos"
              : categoriaNormalizada}
          </h2>

          {loading ? (
            <p className="text-center my-6">Cargando productos...</p>
          ) : productosPaginados.length === 0 ? (
            <p className="text-center my-6 text-gray-500">No se encontraron productos.</p>
          ) : (
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
          )}

          {!loading && productosFiltrados.length > PRODUCTOS_POR_PAGINA && (
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={manejarCambioPagina}
            />
          )}
        </main>
      </div>

      <div className="mt-6">
        <PromoBanner />
      </div>
    </>
  );
}
