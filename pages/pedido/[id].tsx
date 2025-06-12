'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PedidoCard } from '@/components/carrito/PedidoCard'

const PedidoDetalle = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [pedido, setPedido] = useState<any | null>(null)

  useEffect(() => {
    if (id) {
      // Buscar el pedido en localStorage
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
      const pedidoEncontrado = pedidos.find((p: any) => p.id === id)

      if (pedidoEncontrado) {
        setPedido(pedidoEncontrado)
      } else {
        setPedido(null)
      }
    }
  }, [id])

  if (pedido === null) return <p className="text-center mt-10">Cargando pedido...</p>

  if (!pedido)
    return (
      <p className="text-center mt-10 text-red-500">
        Pedido no encontrado. Verifica tu número de pedido.
      </p>
    )

  return (
    <Section>
      <div className="text-center">
        <h3 className="text-[var(--color-principal)]">Detalles del pedido</h3>
      </div>

      <PedidoCard
        id={pedido.id}
        estado={pedido.estado}
        total={pedido.total}
        productos={pedido.productos}
      />

      <div className="flex justify-center mt-6">
        <Button variant="default" onClick={() => router.push('/usuarios/perfil')}>
          Volver al perfil
        </Button>
      </div>
    </Section>
  )
}

export default PedidoDetalle
