'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PedidoCard } from '@/components/carrito/PedidoCard'
import { useEstadoPedido } from '@/hooks/useEstadoPedido'
import { generarFacturaPDF } from "@/utils/generarFactura"

const PedidoDetalle = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [pedido, setPedido] = useState<any | null>(null)

  useEffect(() => {
    if (id) {
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
      const pedidoEncontrado = pedidos.find((p: any) => p.id === id)

      if (pedidoEncontrado) {
        setPedido(pedidoEncontrado)
      } else {
        setPedido(false)
      }
    }
  }, [id])

  if (pedido === null) {
    return <p className="text-center mt-10">Cargando pedido...</p>
  }

  if (pedido === false) {
    return (
      <p className="text-center mt-10 text-red-500">
        Pedido no encontrado. Verifica tu número de pedido.
      </p>
    )
  }

  return (
    <DetalleConEstado
      pedido={pedido}
      onVolver={() => router.push('/usuarios/perfil')}
    />
  )
}

interface DetalleConEstadoProps {
  pedido: any
  onVolver: () => void
}

const DetalleConEstado = ({ pedido, onVolver }: DetalleConEstadoProps) => {
  const { estado, avanzarEstado } = useEstadoPedido({
    pedidoId: pedido.id,
    estadoInicial: pedido.estado
  })

  const router = useRouter()

  return (
    <Section>
      <div className="text-center">
        <h3 className="text-[var(--color-principal)] text-2xl mb-4">
          Detalles del pedido
        </h3>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Estado del pedido</h4>
        <ul className="text-sm space-y-1">
          <li className={['Procesando', 'En camino', 'En embarcación', 'Entregado'].includes(estado) ? 'text-green-600' : ''}>
            ⚙️ Procesando
          </li>
          <li className={['En camino', 'En embarcación', 'Entregado'].includes(estado) ? 'text-green-600' : ''}>
            🚚 En camino
          </li>
          <li className={['En embarcación', 'Entregado'].includes(estado) ? 'text-green-600' : ''}>
            🛳️ En embarcación
          </li>
          <li className={estado === 'Entregado' ? 'text-green-600' : ''}>
            ✅ Entregado
          </li>
        </ul>
      </div>

      <div className="mt-4 mb-6">
        <p><strong>Dirección de envío:</strong> {pedido.direccion || 'No especificada'}</p>
      </div>

      <PedidoCard
        id={pedido.id}
        estado={estado}
        total={pedido.total}
        productos={pedido.productos}
      />

      {/* Acordeones de productos */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Productos del pedido</h4>
        <div className="space-y-2 max-h-[400px] overflow-y-auto border rounded-md p-2">
          {pedido.productos.map((producto: any, index: number) => (
            <AcordeonProducto key={index} producto={producto} />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Button variant="secondary" onClick={avanzarEstado}>
          Avanzar estado
        </Button>
        <Button variant="default" onClick={onVolver}>
          Volver al perfil
        </Button>
        <Button variant="default" onClick={() => generarFacturaPDF(pedido)}>
          Descargar factura
        </Button>
      </div>
    </Section>
  )
}

const AcordeonProducto = ({ producto }: { producto: any }) => {
  const [abierto, setAbierto] = useState(false)
  const router = useRouter()

  return (
    <div className="border rounded-md shadow p-3">
      <div
        onClick={() => setAbierto(!abierto)}
        className="cursor-pointer flex justify-between items-center"
      >
        <span className="font-semibold">{producto.nombre}</span>
        <span>{abierto ? '▲' : '▼'}</span>
      </div>

      {abierto && (
        <div className="mt-2 text-sm space-y-1">
          <p>Cantidad: {producto.cantidad}</p>
          <p>Precio: ${producto.precio}</p>
          <Button
            variant="secondary"
            onClick={() => router.push(`/productos/${producto.slug}#reseñas`)}
          >
            Dejar reseña
          </Button>
        </div>
      )}
    </div>
  )
}

export default PedidoDetalle
