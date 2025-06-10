// components/productos/ProductoDetalleVisual.tsx

import { GaleriaProducto } from "./GaleriaProducto";
import { ProductoStock } from "./sec-derecha/ProductoStock";
import { ProductoCantidad } from "./sec-derecha/ProductoCantidad";
import { BotonesAccion } from "./sec-izquierda/BotonesAccion";
import { Producto } from "@/data/productosMock";

interface Props {
  producto: Producto;
}

export default function ProductoDetalleVisual({ producto }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Contenido principal del producto */}
      <div className="flex-1 space-y-6">
        {/* Galería */}
        <GaleriaProducto
          key={producto.slug}
          imagenPrincipal={producto.imagen}
          imagenesSecundarias={producto.imagenesSecundarias}
          alt={producto.nombre}
        />
        {/* Stock y cantidad */}
        <div className="flex items-center gap-4 px-4">
          <div className="flex-1">
            <ProductoStock
              stock={producto.stock}
              tiempoEnvioDias={producto.tiempoEnvioDias}
              ubicacion={producto.ubicacion}
              limiteStockVisible={producto.limiteStockVisible}
            />
          </div>
          <div className="flex-shrink-0">
            <ProductoCantidad />
          </div>
        </div>
        {/* Botones */}
        <div className="">
          <BotonesAccion />
        </div>
      </div>
    </div>

  );
}


