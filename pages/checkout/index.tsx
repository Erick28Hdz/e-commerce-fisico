'use client';

import { useSesion } from '@/contexts/SesionContext';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCarrito } from '@/contexts/CarritoContext';

export default function CheckoutPage() {
  const { usuario } = useSesion();
  const router = useRouter();
  const { carrito, vaciarCarrito } = useCarrito();

  const [productos, setProductos] = useState<any[]>([]);
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('tarjeta');

  useEffect(() => {
    if (!usuario) {
      router.push('/login');
      return;
    }

    // Si el carrito está vacío, intentamos usar compra directa
    if (carrito.length === 0) {
      const compraDirecta = localStorage.getItem('compra_directa');
      if (compraDirecta) {
        const { producto, cantidad } = JSON.parse(compraDirecta);
        setProductos([{ ...producto, cantidad }]);
      } else {
        router.push('/carrito'); // Si no hay nada, regresamos al carrito
      }
    } else {
      setProductos(carrito);
    }
  }, [usuario, carrito, router]);

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const cantidad = productos.reduce((acc, p) => acc + p.cantidad, 0);

  const handleConfirmarPedido = () => {
    const pedido = {
      productos,
      direccion,
      metodoPago,
      cantidad,
      total,
      fecha: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
    };

    localStorage.setItem('pedido_reciente', JSON.stringify(pedido));

    // Agregar al historial
    const pedidosPrevios = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidosPrevios.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosPrevios));

    // Limpiar solo si vino del carrito
    if (carrito.length > 0) vaciarCarrito();

    // También podrías limpiar la compra directa si quieres
    localStorage.removeItem('compra_directa');

    router.push('/pedido/confirmado');
  };

  if (productos.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--color-bg-light)] rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-[var(--color-principal)]">
        Finalizar Compra
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Dirección de Envío</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Ej: Calle 123, Ciudad, País"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Método de Pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="tarjeta">Tarjeta de Crédito</option>
            <option value="transferencia">Transferencia Bancaria</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded-md border mt-4">
          <h3 className="text-lg font-semibold text-[var(--color-principal)] mb-2">
            Resumen del Pedido
          </h3>
          <ul className="mb-2">
            {productos.map((p) => (
              <li key={p.id}>
                {p.nombre} x {p.cantidad} = ${(p.precio * p.cantidad).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Cantidad de productos: {cantidad}</p>
          <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        </div>

        <Button onClick={handleConfirmarPedido} className="w-full py-2">
          Confirmar Pedido
        </Button>
      </div>
    </div>
  );
}
