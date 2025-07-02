import { useState, useEffect } from "react";
import { useSesion } from "@/contexts/SesionContext";

// Solo necesitas estos campos para identificar y guardar el producto
type ProductoGuardadoMinimal = {
  id: string;
  nombre: string;
  slug: string;
  imagen: string;
  precio: number;
};

export const useProductoGuardado = (producto: ProductoGuardadoMinimal) => {
  const { usuario, estaAutenticado } = useSesion();
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    if (!usuario?.id || !producto?.id) return;

    fetch("/api/productos/productos-guardados")
      .then(res => res.json())
      .then((data: ProductoGuardadoMinimal[]) => {
        const existe = data.some(p => p.id === producto.id);
        setGuardado(existe);
      });
  }, [usuario, producto]);

  const toggleGuardado = async () => {
    if (!estaAutenticado || !usuario) {
      alert("Debes iniciar sesión para guardar productos.");
      return;
    }

    try {
      const method = guardado ? "DELETE" : "POST";
      await fetch("/api/productos/productos-guardados", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId: producto.id }),
      });
      setGuardado(!guardado);
    } catch (error) {
      console.error("Error al cambiar estado del producto guardado:", error);
    }
  };

  return { guardado, toggleGuardado };
};
