'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function PedidoConfirmado() {
  const router = useRouter()
  const [pedido, setPedido] = useState<any>(null)

  useEffect(() => {
    const pedidoGuardado = localStorage.getItem('pedido_reciente')
    if (pedidoGuardado) {
      const nuevoPedido = JSON.parse(pedidoGuardado)
      setPedido(nuevoPedido)
      localStorage.removeItem('pedido_reciente')

      // Agregar al historial
      const historialStr = localStorage.getItem('historial_pedidos')
      const historial = historialStr ? JSON.parse(historialStr) : []
      const nuevoHistorial = [nuevoPedido, ...historial] // puedes limitar longitud si quieres
      localStorage.setItem('historial_pedidos', JSON.stringify(nuevoHistorial))
      localStorage.setItem('pedidos', JSON.stringify(nuevoHistorial))
    }
  }, [])

  const handleVerPedido = () => {
    if (pedido?.id) {
      router.push(`/pedido/${pedido.id}`)
    }
  }

  if (!pedido) return null

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-[var(--color-bg-light)] border border-[var(--color-accent)] rounded-xl shadow-lg text-center">
      <h1 className="text-3xl font-bold text-[var(--color-principal)] mb-4">¡Gracias por tu compra!</h1>

      <p className="text-lg text-[var(--color-text-primary)] mb-6">
        Tu pedido ha sido confirmado exitosamente.
      </p>

      <p className="text-md mb-2">
        Número de pedido: <span className="font-semibold text-[var(--color-principal)]">{pedido.id}</span>
      </p>

      <div className="text-left text-sm mt-4 bg-white p-4 rounded-md">
        <p><strong>Dirección:</strong> {pedido.direccion}</p>
        <p><strong>Método de pago:</strong> {pedido.metodoPago}</p>
        <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
        <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>
        <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
        <ul className="mt-2">
          {pedido.productos.map((prod: any) => (
            <li key={prod.id}>
              {prod.nombre} x {prod.cantidad} = ${(prod.precio * prod.cantidad).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleVerPedido} className="w-full mt-6 py-2">
        Ver Detalles del Pedido
      </Button>
    </div>
  )
}
