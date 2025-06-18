import React, { useState } from 'react'
import Image from 'next/image'
import { EstadoPedido } from '@/components/checkout/EstadoPedido'

type Producto = {
  nombre: string
  cantidad: number
  imagen: string
  precio?: number
}

type PedidoCardProps = {
  id: string | string[] | undefined
  estado: string
  total: number
  productos: Producto[]
}

export const PedidoCard = ({ id, estado, total, productos }: PedidoCardProps) => {
  const [mostrarProductos, setMostrarProductos] = useState(false)

  return (
    <div className="p-6 bg-[var(--color-bg-light)] rounded-2xl shadow-lg max-w-xl mx-auto mt-8 border border-[var(--color-bg-secondary)]">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-extrabold text-[var(--color-principal)]">
          Pedido #{id}
        </h5>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-accent)] text-[var(--color-principal)] shadow-sm">
          {estado}
        </span>
      </div>

      {/* Botón para mostrar/ocultar productos */}
      <div className="mb-4">
        <button
          onClick={() => setMostrarProductos(!mostrarProductos)}
          className="text-sm text-[var(--color-principal)] underline"
        >
          {mostrarProductos ? 'Ocultar productos ▲' : 'Ver productos ▼'}
        </button>
      </div>

      {/* Lista de productos plegable */}
      {mostrarProductos && (
        <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[var(--color-bg-secondary)] p-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-[var(--color-principal)]">{producto.nombre}</p>
                <p className="text-sm text-[var(--color-text-primary)]">Cantidad: {producto.cantidad}</p>
                {producto.precio && (
                  <p className="text-sm text-[var(--color-text-primary)]">
                    Subtotal: <span className="font-medium">${(producto.precio * producto.cantidad).toFixed(2)}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right font-bold text-[var(--color-principal)] text-xl mt-2">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}
