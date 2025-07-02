import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import SidebarCategorias from "@/components/productos/sidebar/SidebarCategorias";
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import Paginacion from "@/components/ui/Paginacion";

const PRODUCTOS_POR_PAGINA = 9;

interface Producto {
  id: string;
  nombre: string;
  slug: string;
  precio: number;
  precioAntiguo?: number;
  descuento?: number;
  mensaje?: string;
  imagen: string;
  stock: number;
  categoria: string;
}

export default function ProductosPorCategoriaPage() {
  const router = useRouter();
  const { categoria } = router.query;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);

  const categoriaNormalizada = typeof categoria === "string" ? categoria : "Todos";

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/productos?categoria=${categoriaNormalizada}`);
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoria) {
      fetchProductos();
    }
  }, [categoria]);

  const productosPaginados = useMemo(() => {
    const indiceUltimo = paginaActual * PRODUCTOS_POR_PAGINA;
    const indicePrimero = indiceUltimo - PRODUCTOS_POR_PAGINA;
    return productos.slice(indicePrimero, indiceUltimo);
  }, [productos, paginaActual]);

  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);

  const manejarCambioPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return (
    <Container>
      <div className="flex gap-8">
        <SidebarCategorias onFiltrar={() => {}} /> {/* Puedes dejarlo vacío o pasar lógica */}
        <main className="flex-1">
          <h3 className="mb-4 text-center text-xl capitalize text-[var(--color-principal)]">
            Productos en "{categoriaNormalizada}"
          </h3>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : productosPaginados.length === 0 ? (
            <p className="text-center text-gray-400">No hay productos en esta categoría.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productosPaginados.map((producto) => (
                  <ProductoCard key={producto.id} {...producto} />
                ))}
              </div>

              <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={manejarCambioPagina}
              />
            </>
          )}
        </main>
      </div>
    </Container>
  );
}
