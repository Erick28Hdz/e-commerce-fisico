import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Producto as ProductoPrisma } from "@prisma/client";
import { ProductoDetalles } from "@/components/productos/detallado/ProductoDetalles";
import VolverAtras from "@/components/ui/VolverAtras";
import ProductoDetalleVisual from "@/components/productos/detallado/ProductoDetalleVisual";
import { ProductoReviews } from "@/components/productos/detallado/secciones/ProductoReviews";
import { SeccionConfianza } from "@/components/productos/detallado/sec-izquierda/SeccionConfianza";
import ProductosMismaCategoria from "@/components/productos/detallado/secciones/ProductosMismaCategoria";
import ProductosMasVendidos from "@/components/productos/detallado/secciones/ProductosMasVendidos";
import ProductosRecomendados from "@/components/productos/detallado/secciones/ProductosRecomendados";
import { normalizarProducto } from "@/utils/normalizarProducto";

export default function ProductoPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [producto, setProducto] = useState<ProductoPrisma | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/productos/${slug}`);
        if (!res.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await res.json();
        const productoNormalizado = normalizarProducto(data);
        setProducto(productoNormalizado);
      } catch (error) {
        console.error(error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Cargando producto...</div>;
  }

  if (!producto) {
    return (
      <div className="p-10 text-center text-red-600">
        <p>Producto no encontrado</p>
      </div>
    );
  }



  return (
    <>
      <Head>
        <title>{producto.nombre} | SuperTienda</title>
      </Head>
      <div className="p-6 md:p-10 max-w-8xl mx-auto bg-[var(--color-bg-light)] rounded-2xl shadow-xl">
        <div className="mb-2">
          <VolverAtras />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <ProductoDetalleVisual producto={producto} />
          <ProductoDetalles producto={producto} />
        </div>

        <div>
          <SeccionConfianza />
        </div>

        <ProductosMismaCategoria
          categoria={producto.categoria}
          actualSlug={producto.slug}
        />

        <ProductosMasVendidos />
        <ProductosRecomendados />

        <div id="reseñas" className="mt-10">
          <ProductoReviews producto={producto} initialReviews={[]} />
        </div>
      </div>
    </>
  );
}
