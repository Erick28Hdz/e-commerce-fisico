// components/EstadoPedido.tsx
import React from 'react'

interface Props {
  estado: string
}

const colores: Record<string, string> = {
  Procesando: 'bg-yellow-300 text-yellow-900',
  'En camino': 'bg-blue-300 text-blue-900',
  'En embarcación': 'bg-purple-300 text-purple-900',
  Entregado: 'bg-green-300 text-green-900'
}

export const EstadoPedido: React.FC<Props> = ({ estado }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colores[estado] ?? 'bg-gray-200'}`}>
      {estado}
    </span>
  )
}
