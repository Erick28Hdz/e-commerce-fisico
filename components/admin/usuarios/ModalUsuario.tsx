// components/admin/usuarios/ModalUsuario.tsx
import { Usuario } from '@/types/usuario'
import { ModalUniversal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface ModalUsuarioProps {
  abierto: boolean
  modoEditar: boolean
  usuario: Partial<Usuario>
  onClose: () => void
  onChange: (usuario: Partial<Usuario>) => void
  onGuardar: () => void
}

export default function ModalUsuario({ abierto, modoEditar, usuario, onClose, onChange, onGuardar }: ModalUsuarioProps) {
  return (
    <ModalUniversal abierto={abierto} onClose={onClose} titulo={modoEditar ? 'Editar Usuario' : 'Nuevo Usuario'}>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <input type="text" placeholder="Nombre" value={usuario.name || ''} onChange={e => onChange({ ...usuario, name: e.target.value })} className="w-full border p-2 rounded" />
        <input type="email" placeholder="Correo" value={usuario.email || ''} onChange={e => onChange({ ...usuario, email: e.target.value })} className="w-full border p-2 rounded" />
        <input type="password" placeholder="Contraseña" value={usuario.password || ''} onChange={e => onChange({ ...usuario, password: e.target.value })} className="w-full border p-2 rounded" />
        <select value={usuario.role || 'cliente'} onChange={e => onChange({ ...usuario, role: e.target.value as 'admin' | 'cliente' })} className="w-full border p-2 rounded">
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
        <select value={usuario.verificado ? 'sí' : 'no'} onChange={e => onChange({ ...usuario, verificado: e.target.value === 'sí' })} className="w-full border p-2 rounded">
          <option value="sí">Verificado</option>
          <option value="no">No verificado</option>
        </select>
        <input type="tel" placeholder="Teléfono" value={usuario.telefono || ''} onChange={e => onChange({ ...usuario, telefono: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Dirección" value={usuario.direccion || ''} onChange={e => onChange({ ...usuario, direccion: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Ciudad" value={usuario.ciudad || ''} onChange={e => onChange({ ...usuario, ciudad: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="País" value={usuario.pais || ''} onChange={e => onChange({ ...usuario, pais: e.target.value })} className="w-full border p-2 rounded" />
        <input type="date" placeholder="Fecha de nacimiento" value={usuario.fechaNacimiento || ''} onChange={e => onChange({ ...usuario, fechaNacimiento: e.target.value })} className="w-full border p-2 rounded" />
        <Button onClick={onGuardar}>{modoEditar ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
      </div>
    </ModalUniversal>
  )
}