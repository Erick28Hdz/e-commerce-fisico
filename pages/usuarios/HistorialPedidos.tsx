import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'

interface Producto {
  nombre: string
  cantidad: number
}

interface Pedido {
  id: string
  estado: string
  productos: Producto[]
  total: number
}

const PedidoDetalle = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const historialGuardado = localStorage.getItem('historial_pedidos')
    if (historialGuardado) {
      setPedidos(JSON.parse(historialGuardado))
    }
  }, [])

  if (pedidos.length === 0) return <p className="text-center mt-8">No hay pedidos recientes.</p>

  return (
    <Section>
      <div className="text-center">
        <h3 className="text-[var(--color-principal)]">Historial de Pedidos</h3>
      </div>

      <div className="space-y-6 mt-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto"
          >
            <h5 className="text-xl font-bold mb-2 text-[var(--color-principal)]">
              Pedido #{pedido.id}
            </h5>
            <p className="mb-2 font-medium text-[var(--color-accent)]">
              Estado: {pedido.estado}
            </p>
            <p className="mb-4 font-semibold">Total: ${pedido.total.toFixed(2)}</p>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {pedido.productos.map((producto, index) => (
                <li key={index}>
                  {producto.nombre} x {producto.cantidad}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default PedidoDetalle
