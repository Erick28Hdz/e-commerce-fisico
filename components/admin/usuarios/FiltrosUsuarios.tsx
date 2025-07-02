// src/components/admin/usuarios/FiltrosUsuarios.tsx
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  filtroTexto: string
  setFiltroTexto: Dispatch<SetStateAction<string>>
  filtroRol: string
  setFiltroRol: Dispatch<SetStateAction<string>>
  filtroVerificado: string
  setFiltroVerificado: Dispatch<SetStateAction<string>>
  orden: 'nombre' | 'fecha'
  setOrden: Dispatch<SetStateAction<'nombre' | 'fecha'>>
  setPaginaActual: Dispatch<SetStateAction<number>>
}

export default function FiltrosUsuarios({
  filtroTexto,
  setFiltroTexto,
  filtroRol,
  setFiltroRol,
  filtroVerificado,
  setFiltroVerificado,
  orden,
  setOrden,
  setPaginaActual
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre o correo"
        value={filtroTexto}
        onChange={(e) => {
          setFiltroTexto(e.target.value.toLowerCase())
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      />

      <select
        value={filtroRol}
        onChange={(e) => {
          setFiltroRol(e.target.value)
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      >
        <option value="">Todos los roles</option>
        <option value="admin">Administrador</option>
        <option value="cliente">Cliente</option>
      </select>

      <select
        value={filtroVerificado}
        onChange={(e) => {
          setFiltroVerificado(e.target.value)
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      >
        <option value="">Verificados y no</option>
        <option value="sí">Solo verificados</option>
        <option value="no">No verificados</option>
      </select>

      <select
        value={orden}
        onChange={(e) => {
          setOrden(e.target.value as 'nombre' | 'fecha')
          setPaginaActual(1)
        }}
        className="border p-2 rounded"
      >
        <option value="nombre">Ordenar por nombre</option>
        <option value="fecha">Ordenar por fecha</option>
      </select>

      <Button
        variant="secondary"
        onClick={() => {
          setFiltroTexto('')
          setFiltroRol('')
          setFiltroVerificado('')
          setOrden('nombre')
          setPaginaActual(1)
        }}
      >
        Limpiar filtros
      </Button>
    </div>
  )
}
