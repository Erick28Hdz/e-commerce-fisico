'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';
import type { Producto } from "@prisma/client";

type CarritoItem = Producto & { cantidad: number };

type CarritoContextType = {
  carrito: CarritoItem[];
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  comprarAhora: (producto: Producto, cantidad: number) => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const router = useRouter();

  // ✅ Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // ✅ Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: Producto, cantidad: number = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  const aumentarCantidad = (id: string) => {
    setCarrito((prev) =>
      prev.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p)
    );
  };

  const disminuirCantidad = (id: string) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // ✅ NUEVO: Función comprarAhora
  const comprarAhora = (producto: Producto, cantidad: number) => {
    const compraDirecta = { producto, cantidad };
    localStorage.setItem('compra_directa', JSON.stringify(compraDirecta));
    router.push('/checkout');
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
        comprarAhora,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
