// 📄 CarritoLista.tsx
import ProductoItem from "./ProductoItem";
import type { Producto } from '@/types/producto';

interface CarritoListaProps {
  productos: Producto[]; // ✅ corregido aquí
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  eliminarProducto: (id: string) => void;
}

export default function CarritoLista({
  productos,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
}: CarritoListaProps) {
  return (
    <div className="flex-1 space-y-6">
      {productos.map((producto) => (
        <ProductoItem
          key={producto.id}
          producto={producto}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          eliminarProducto={eliminarProducto}
        />
      ))}
    </div>
  );
}