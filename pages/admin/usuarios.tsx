import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import TablaUsuarios from '@/components/admin/usuarios/TablaUsuarios'
import FiltrosUsuarios from '@/components/admin/usuarios/FiltrosUsuarios'
import ModalUsuarios from '@/components/admin/usuarios/ModalUsuario'
import Paginacion from '@/components/ui/Paginacion'
import { Usuario } from '@/types/usuario'
import { Button } from '@/components/ui/Button'

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [cargando, setCargando] = useState(true)

    const [filtroTexto, setFiltroTexto] = useState('')
    const [filtroRol, setFiltroRol] = useState('')
    const [filtroVerificado, setFiltroVerificado] = useState('')
    const [orden, setOrden] = useState<'nombre' | 'fecha'>('nombre')

    const [paginaActual, setPaginaActual] = useState(1)
    const usuariosPorPagina = 15

    const [modalAbierto, setModalAbierto] = useState(false)
    const [modoEditar, setModoEditar] = useState(false)
    const [usuarioActivo, setUsuarioActivo] = useState<Partial<Usuario>>({})

    useEffect(() => {
        fetch('/api/admin/usuarios')
            .then(res => res.json())
            .then(data => {
                setUsuarios(data)
                setCargando(false)
            })
            .catch(err => {
                console.error('Error cargando usuarios:', err)
                setCargando(false)
            })
    }, [])

    const abrirModalCrear = () => {
        setModoEditar(false)
        setUsuarioActivo({})
        setModalAbierto(true)
    }

    function handleEditar(usuario: Usuario) {
        setModoEditar(true)
        setUsuarioActivo(usuario)
        setModalAbierto(true)
    }

    function handleEliminar(id: string) {
        if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

        fetch(`/api/admin/usuarios/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                alert("Usuario eliminado")
                setUsuarios(prev => prev.filter(u => u.id !== id))
            })
            .catch(err => console.error('Error al eliminar usuario:', err))
    }

    async function guardarUsuario() {
        const usuarioFormateado = {
            ...usuarioActivo,
            role: usuarioActivo.role || 'cliente',
            verificado: !!usuarioActivo.verificado,
            direccion: usuarioActivo.direccion || null,
            telefono: usuarioActivo.telefono || null,
            ciudad: usuarioActivo.ciudad || null,
            pais: usuarioActivo.pais || null,
            avatar: usuarioActivo.avatar || null,
            fechaNacimiento: usuarioActivo.fechaNacimiento ? new Date(usuarioActivo.fechaNacimiento) : null,
        }

        const metodo = modoEditar ? 'PUT' : 'POST'
        const endpoint = modoEditar ? `/api/admin/usuarios/${usuarioActivo.id}` : `/api/admin/usuarios`

        const res = await fetch(endpoint, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioFormateado),
        })

        const data = await res.json()
        setModalAbierto(false)

        if (modoEditar) {
            setUsuarios(prev => prev.map(u => (u.id === data.id ? data : u)))
        } else {
            setUsuarios(prev => [...prev, data])
        }
    }

    // FILTRADO Y ORDENADO
    const usuariosFiltrados = usuarios
        .filter(u =>
            !filtroTexto ||
            u.name?.toLowerCase().includes(filtroTexto) ||
            u.email.toLowerCase().includes(filtroTexto)
        )
        .filter(u => !filtroRol || u.role === filtroRol)
        .filter(u => filtroVerificado === '' ? true : filtroVerificado === 'sí' ? u.verificado : !u.verificado)
        .sort((a, b) => orden === 'fecha'
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : (a.name || '').localeCompare(b.name || '')
        )

    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina)

    const usuariosPaginados = usuariosFiltrados.slice(
        (paginaActual - 1) * usuariosPorPagina,
        paginaActual * usuariosPorPagina
    )

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                <Button onClick={abrirModalCrear}>+ Nuevo Usuario</Button>
            </div>

            <FiltrosUsuarios
                filtroTexto={filtroTexto}
                setFiltroTexto={setFiltroTexto}
                filtroRol={filtroRol}
                setFiltroRol={setFiltroRol}
                filtroVerificado={filtroVerificado}
                setFiltroVerificado={setFiltroVerificado}
                orden={orden}
                setOrden={setOrden}
                setPaginaActual={setPaginaActual}
            />

            {cargando ? (
                <p className="text-gray-500">Cargando usuarios...</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <TablaUsuarios
                            usuarios={usuariosPaginados}
                            onEditar={handleEditar}
                            onEliminar={handleEliminar}
                        />
                    </div>
                    {totalPaginas > 1 && (
                        <Paginacion
                            paginaActual={paginaActual}
                            totalPaginas={totalPaginas}
                            onCambiarPagina={setPaginaActual}
                        />
                    )}
                </>
            )}

            <ModalUsuarios
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                modoEditar={modoEditar}
                usuario={usuarioActivo}
                onChange={setUsuarioActivo}
                onGuardar={guardarUsuario}
            />
        </AdminLayout>
    )
}
