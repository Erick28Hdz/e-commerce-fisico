import { useRouter } from "next/router";
import { productosMock } from "@/data/productosMock";
import { useMemo } from "react";
import { GaleriaProducto } from "@/components/productos/detallado/GaleriaProducto";
import { ProductoDetalles } from "@/components/productos/detallado/ProductoDetalles";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BotonesAccion } from "@/components/productos/detallado/sec-izquierda/BotonesAccion";
import { ProductoReviews } from "@/components/productos/detallado/secciones/ProductoReviews";
import ProductosMismaCategoria from "@/components/productos/detallado/secciones/ProductosMismaCategoria";
import ProductosMasVendidos from "@/components/productos/detallado/secciones/ProductosMasVendidos";
import ProductosRecomendados from "@/components/productos/detallado/secciones/ProductosRecomendados";
import { reviewsMock } from "@/data/reviewsMock";

export default function ProductoPage() {
  const router = useRouter();
  const { slug } = router.query;

  const producto = useMemo(() => {
    if (!slug || typeof slug !== "string") return null;
    return productosMock.find((p) => p.slug === slug);
  }, [slug]);

  // Filtras reseñas para el producto actual:
  const reseñasDelProducto = useMemo(() => {
    if (!producto) return [];
    return reviewsMock.filter((r) => r.productoId === producto.id);
  }, [producto]);

  if (!producto) {
    return (
      <div className="p-10 text-center text-red-600">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-8xl mx-auto bg-[var(--color-bg-light)] rounded-2xl shadow-xl">

      {/* Botón de volver al inicio del contenido */}
      <div className="mb-2">
        <Button
          onClick={() => router.push("/productos")}
          variant="ghost"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Contenido del producto */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Galería de imágenes */}
        <div className="flex-1">
          <GaleriaProducto
            key={producto.slug}
            imagenPrincipal={producto.imagen}
            imagenesSecundarias={producto.imagenesSecundarias}
            alt={producto.nombre}
          />
          {/* Botones de acción */}
          <div className="mt-10 flex justify-center gap-6">
            <BotonesAccion />
          </div>
        </div>

        {/* Detalles del producto */}
        <ProductoDetalles producto={producto} />
      </div>

      {/* Sección de productos de la misma categoría */}
      <ProductosMismaCategoria
        categoria={producto.categoria}
        actualSlug={producto.slug}
      />
      {/* Sección de más vendidos */}
      <ProductosMasVendidos />

      {/* Sección de recomendados para ti */}
      <ProductosRecomendados />

      <div className="mt-10">
        <ProductoReviews producto={producto} initialReviews={reseñasDelProducto}/>
      </div>
    </div>
  );
}
