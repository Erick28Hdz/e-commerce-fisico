// pages/carrito/index.tsx
import Head from "next/head";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import CarritoLista from "@/components/carrito/CarritoLista";
import ResumenPedido from "@/components/carrito/ResumenPedido";
import { CarritoVacio } from "@/components/carrito/CarritoVacio";
import { productosMock, Producto } from "@/data/productosMock";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

export default function Carrito() {
  const [productos, setProductos] = useState<Producto[]>(productosMock);

  const aumentarCantidad = (id: string) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const disminuirCantidad = (id: string) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  };

  const eliminarProducto = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <>
      <Head>
        <title>Carrito | SuperTienda</title>
      </Head>
      <Section className="py-10 px-6 lg:px-16">
        <h2 className="text-4xl font-bold text-center text-[var(--color-principal)] mb-8">
          Tu Carrito
        </h2>

        {productos.filter(p => p.cantidad > 0).length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Lista del carrito con scroll */}
            <div className="lg:w-2/3 max-h-[450px] overflow-y-auto p-4 pr-2 shadow-inner border rounded-lg">
              <CarritoLista
                productos={productos.filter(p => p.cantidad > 0)}
                aumentarCantidad={aumentarCantidad}
                disminuirCantidad={disminuirCantidad}
                eliminarProducto={eliminarProducto}
              />
            </div>

            {/* Resumen + Métodos de pago en columna */}
            <div className="lg:w-1/3 flex flex-col items-center gap-6">
              <ResumenPedido
                total={total}
                cantidad={productos.reduce((acc, p) => acc + p.cantidad, 0)}
              />
              <div className="w-full flex justify-center">
                <PaymentIcons />
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
