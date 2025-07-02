import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

interface FiltrosProductosProps {
  filtroNombre: string
  setFiltroNombre: Dispatch<SetStateAction<string>>
  filtroReferencia: string
  setFiltroReferencia: Dispatch<SetStateAction<string>>
  filtroCategoria: string
  setFiltroCategoria: Dispatch<SetStateAction<string>>
  orden: 'nombre' | 'precio' | 'fecha'
  setOrden: Dispatch<SetStateAction<'nombre' | 'precio' | 'fecha'>>
  setPaginaActual: Dispatch<SetStateAction<number>>
}

export default function FiltrosProductos({
  filtroNombre,
  setFiltroNombre,
  filtroReferencia,
  setFiltroReferencia,
  filtroCategoria,
  setFiltroCategoria,
  orden,
  setOrden,
  setPaginaActual
}: FiltrosProductosProps) {
  const [categoriasDisponibles, setCategoriasDisponibles] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/admin/productos/categorias')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategoriasDisponibles(data)
        }
      })
      .catch(err => console.error('Error al cargar categorías:', err))
  }, [])

  const limpiarFiltros = () => {
    setFiltroNombre('')
    setFiltroReferencia('')
    setFiltroCategoria('')
    setOrden('nombre')
    setPaginaActual(1)
  }

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={filtroNombre}
        onChange={(e) => {
          setFiltroNombre(e.target.value.toLowerCase())
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Buscar por referencia"
        value={filtroReferencia}
        onChange={(e) => {
          setFiltroReferencia(e.target.value.toLowerCase())
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      />

      <select
        value={filtroCategoria}
        onChange={(e) => {
          setFiltroCategoria(e.target.value)
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      >
        <option value="">Todas las categorías</option>
        {categoriasDisponibles.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={orden}
        onChange={(e) => {
          setOrden(e.target.value as 'nombre' | 'fecha' | 'precio')
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      >
        <option value="nombre">Ordenar por nombre</option>
        <option value="fecha">Ordenar por fecha</option>
        <option value="precio">Ordenar por precio</option>
      </select>

      <Button variant="secondary" onClick={limpiarFiltros}>
        Limpiar filtros
      </Button>
    </div>
  )
}
