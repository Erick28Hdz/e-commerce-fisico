import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { productosMock } from "@/data/productosMock";
import { Container } from "@/components/ui/container";
import SidebarCategorias from "@/components/productos/sidebar/SidebarCategorias";
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import Paginacion from "@/components/ui/Paginacion";

const PRODUCTOS_POR_PAGINA = 9;

export default function ProductosPorCategoriaPage() {
  const router = useRouter();
  const { categoria } = router.query;

  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrar por categoría
  const productosFiltrados = useMemo(() => {
    if (!categoria || typeof categoria !== "string") return productosMock;
    return productosMock.filter(
      (producto) => producto.categoria === categoria
    );
  }, [categoria]);

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
    <Container>
      <div className="flex gap-8">
        <SidebarCategorias onFiltrar={function (filtros: any): void {
          throw new Error("Function not implemented.");
        } } />
        <main className="flex-1">
          <h3 className="mb-2 text-center capitalize">
            Productos en "{categoria}"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosPaginados.map((producto) => (
              <ProductoCard
                key={producto.id}
                {...producto}
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
    </Container>
  );
}
