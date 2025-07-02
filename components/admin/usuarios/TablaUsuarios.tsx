// components/admin/usuarios/TablaUsuarios.tsx
import { Usuario } from '@/types/usuario'
import { Tabla } from '@/components/ui/Tabla'
import { Button } from '@/components/ui/Button'

interface TablaUsuariosProps {
  usuarios: Usuario[]
  onEditar: (usuario: Usuario) => void
  onEliminar: (id: string) => void
}

export default function TablaUsuarios({ usuarios, onEditar, onEliminar }: TablaUsuariosProps) {
  const columnas = [
    'Nombre', 'Correo', 'Rol', 'Verificado', 'Teléfono', 'Dirección', 'Ciudad', 'País', 'Nacimiento', 'Registrado'
  ]

  const filas = usuarios.map(user => [
    user.name || 'Sin nombre',
    user.email,
    user.role,
    user.verificado ? 'Sí' : 'No',
    user.telefono || '—',
    user.direccion || '—',
    user.ciudad || '—',
    user.pais || '—',
    user.fechaNacimiento ? new Date(user.fechaNacimiento).toLocaleDateString() : '—',
    new Date(user.createdAt).toLocaleDateString()
  ])

  const acciones = usuarios.map(usuario => (
    <div className="flex gap-2 justify-center">
      <Button size="sm" variant="outline" onClick={() => onEditar(usuario)}>Editar</Button>
      <Button size="sm" variant="destructive" onClick={() => onEliminar(usuario.id)}>Eliminar</Button>
    </div>
  ))

  return <Tabla titulo="Lista de usuarios registrados" columnas={columnas} filas={filas} acciones={acciones} />
}