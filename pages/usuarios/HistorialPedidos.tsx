import { useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import Link from 'next/link'
import { PedidoCard } from '@/components/carrito/PedidoCard'
import { Button } from '@/components/ui/Button'
import Paginacion from '@/components/ui/Paginacion'

interface Producto {
  nombre: string
  cantidad: number
  imagen: string
  precio?: number
}

interface Pedido {
  id: string
  estado: string
  productos: Producto[]
  total: number
  direccion?: string
  metodoPago?: string
  fecha?: string
}

const PEDIDOS_POR_PAGINA = 3

const PedidoHistorial = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [expandido, setExpandido] = useState<{ [id: string]: boolean }>({})

  useEffect(() => {
    const historialGuardado = localStorage.getItem('historial_pedidos')
    if (historialGuardado) {
      const historial = JSON.parse(historialGuardado)
      setPedidos(historial)
      localStorage.setItem('pedidos', JSON.stringify(historial))
    }
  }, [])

  const totalPaginas = Math.ceil(pedidos.length / PEDIDOS_POR_PAGINA)
  const inicio = (paginaActual - 1) * PEDIDOS_POR_PAGINA
  const pedidosPagina = pedidos.slice(inicio, inicio + PEDIDOS_POR_PAGINA)

  const volverAComprar = (productos: Producto[]) => {
    const carritoStr = localStorage.getItem('carrito')
    const carrito = carritoStr ? JSON.parse(carritoStr) : []
    const nuevoCarrito = [...carrito, ...productos]
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
    window.location.href = '/carrito'
  }

  const toggleExpandido = (id: string) => {
    setExpandido((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (pedidos.length === 0) {
    return <p className="text-center mt-8">No hay pedidos recientes.</p>
  }

  return (
    <Section>
      <div className="text-center">
        <h3 className="text-[var(--color-principal)]">Historial de Pedidos</h3>
      </div>

      <div className="space-y-6 mt-6">
        {pedidosPagina.map((pedido) => (
          <div key={pedido.id} className="transition rounded-lg p-4 border border-[var(--color-bg-secondary)]">
            {/* Click para expandir/cerrar */}
            <div className="cursor-pointer" onClick={() => toggleExpandido(pedido.id)}>
              <PedidoCard
                id={pedido.id}
                estado={pedido.estado}
                total={pedido.total}
                productos={pedido.productos}
              />
            </div>

            {/* Contenedor con animación */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${expandido[pedido.id] ? 'max-h-[1000px] mt-4' : 'max-h-0'
                }`}
            >
              <div className="mt-4 flex justify-end gap-4">
                <Button onClick={() => volverAComprar(pedido.productos)}>
                  Volver a comprar
                </Button>
                <Button variant="secondary" onClick={() => window.location.href = `/pedido/${pedido.id}`}>
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPaginaActual}
      />
    </Section>
  )
}

export default PedidoHistorial
