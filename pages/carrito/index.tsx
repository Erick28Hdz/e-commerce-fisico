import Head from "next/head";
import { useRouter } from "next/router";
import { Section } from "@/components/ui/Section";
import CarritoLista from "@/components/carrito/CarritoLista";
import ResumenPedido from "@/components/carrito/ResumenPedido";
import { CarritoVacio } from "@/components/carrito/CarritoVacio";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { useCarrito } from "@/contexts/CarritoContext";
import { usePedido } from "@/contexts/PedidoContext";

export default function Carrito() {
  const { carrito, aumentarCantidad, disminuirCantidad, eliminarDelCarrito } = useCarrito();
  const { setPedido } = usePedido(); 
  const router = useRouter();

  const productosValidos = carrito.filter((p) => p.cantidad > 0);
  const total = productosValidos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const cantidadTotal = productosValidos.reduce((acc, p) => acc + p.cantidad, 0);

  const procederAlPago = () => {
    setPedido({
      productos: productosValidos,
      total,
      cantidad: cantidadTotal,
      fecha: new Date().toISOString(),
    });

    router.push("/checkout");
  };

  return (
    <>
      <Head>
        <title>Carrito | SuperTienda</title>
      </Head>
      <Section className="py-10 px-6 lg:px-16">
        <h2 className="text-4xl font-bold text-center text-[var(--color-principal)] mb-8">
          Tu Carrito
        </h2>

        {productosValidos.length === 0 ? (
          <CarritoVacio />
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Lista del carrito con scroll */}
            <div className="lg:w-2/3 max-h-[450px] overflow-y-auto p-4 pr-2 shadow-inner border rounded-lg">
              <CarritoLista
                productos={productosValidos}
                aumentarCantidad={aumentarCantidad}
                disminuirCantidad={disminuirCantidad}
                eliminarProducto={eliminarDelCarrito}
              />
            </div>

            {/* Resumen + Métodos de pago + Botón */}
            <div className="lg:w-1/3 flex flex-col items-center gap-6">
              <ResumenPedido total={total} cantidad={cantidadTotal} />
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
