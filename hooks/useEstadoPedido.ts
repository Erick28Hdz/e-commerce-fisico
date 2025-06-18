import { useState, useEffect } from 'react'

export const estados = ['Procesando', 'En camino', 'En embarcación', 'Entregado'] as const
export type EstadoPedido = typeof estados[number]

interface UseEstadoPedidoProps {
  pedidoId: string
  estadoInicial?: EstadoPedido // <- ahora puede ser opcional
}

export const useEstadoPedido = ({ pedidoId, estadoInicial }: UseEstadoPedidoProps) => {
  const [estado, setEstado] = useState<EstadoPedido>(
    estadoInicial ?? 'Procesando'
  )

  useEffect(() => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
    const pedidosActualizados = pedidos.map((p: any) =>
      p.id === pedidoId ? { ...p, estado } : p
    )
    localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados))
    localStorage.setItem('historial_pedidos', JSON.stringify(pedidosActualizados))
  }, [estado, pedidoId])

  const avanzarEstado = () => {
    const index = estados.indexOf(estado)
    if (index < estados.length - 1) {
      setEstado(estados[index + 1])
    }
  }

  return {
    estado,
    avanzarEstado,
    setEstado
  }
}
