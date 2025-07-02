// pages/admin/productos.tsx
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import TablaProductos from '@/components/admin/productos/TablaProductos'
import FiltrosProductos from '@/components/admin/productos/FiltrosProductos'
import ModalProducto from '@/components/admin/productos/ModalProducto'
import Paginacion from '@/components/ui/Paginacion'
import { Producto } from '@/types/producto'
import { Button } from '@/components/ui/Button'

export default function ProductosPage() {
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroReferencia, setFiltroReferencia] = useState('')
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroTexto, setFiltroTexto] = useState('')
  const [orden, setOrden] = useState<'nombre' | 'fecha' | 'precio'>('nombre')
  const [paginaActual, setPaginaActual] = useState(1)
  const productosPorPagina = 10
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState<File[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modoEditar, setModoEditar] = useState(false)
  const [productoActivo, setProductoActivo] = useState<Partial<Producto>>({})

  useEffect(() => {
    fetch('/api/admin/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        setCargando(false)
      })
      .catch(err => {
        console.error('Error cargando productos:', err)
        setCargando(false)
      })
  }, [])

  const abrirModalCrear = () => {
    setModoEditar(false)
    setProductoActivo({})
    setModalAbierto(true)
  }

  function handleEditar(producto: Producto) {
    setModoEditar(true)
    setProductoActivo(producto)
    setModalAbierto(true)
  }

  function handleEliminar(id: string) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    fetch(`/api/admin/productos/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        alert("Producto eliminado")
        setProductos(prev => prev.filter(p => p.id !== id))
      })
      .catch(err => console.error('Error al eliminar producto:', err))
  }

  async function guardarProducto() {
    // SUBIR LAS IMÁGENES PRIMERO SI HAY ARCHIVOS NUEVOS
    let imagenesSubidas: string[] = [];

    if (imagenesSeleccionadas.length > 0 && productoActivo.referencia) {
      const formData = new FormData();
      imagenesSeleccionadas.forEach((file) => formData.append('images', file));
      formData.append('referencia', productoActivo.referencia);

      const res = await fetch('/api/admin/productos/upload-images', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        imagenesSubidas = data.urls;
      } else {
        alert(data.error || 'Error al subir imágenes');
        return;
      }
    }

    const productoFormateado = {
      ...productoActivo,
      imagenesSecundarias: imagenesSubidas.length > 0 ? imagenesSubidas : productoActivo.imagenesSecundarias || [],
      precioAntiguo: productoActivo.precioAntiguo || null,
      descuento: productoActivo.descuento || null,
      mensaje: productoActivo.mensaje || null,
      tiempoEnvioDias: productoActivo.tiempoEnvioDias || null,
      limiteStockVisible: productoActivo.limiteStockVisible || null,
    };

    const metodo = modoEditar ? 'PUT' : 'POST';
    const endpoint = modoEditar
      ? `/api/admin/productos/${productoActivo.id}`
      : `/api/admin/productos`;

    const res = await fetch(endpoint, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoFormateado),
    });

    const data = await res.json();
    setModalAbierto(false);
    setImagenesSeleccionadas([]);

    if (modoEditar) {
      setProductos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } else {
      setProductos((prev) => [...prev, data]);
    }
  }

  const productosFiltrados = productos
    .filter(p =>
      (!filtroNombre || p.nombre.toLowerCase().includes(filtroNombre)) &&
      (!filtroReferencia || p.referencia.toLowerCase().includes(filtroReferencia)) &&
      (!filtroCategoria || p.categoria.toLowerCase() === filtroCategoria.toLowerCase())
    )
    .sort((a, b) => {
      if (orden === 'fecha') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (orden === 'precio') {
        return a.precio - b.precio // Menor a mayor
      }
      return a.nombre.localeCompare(b.nombre)
    })


  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  )

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <Button onClick={abrirModalCrear}>+ Nuevo Producto</Button>
      </div>

      <FiltrosProductos
        filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroReferencia={filtroReferencia}
        setFiltroReferencia={setFiltroReferencia}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        orden={orden}
        setOrden={setOrden}
        setPaginaActual={setPaginaActual}
      />

      {cargando ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <TablaProductos
              productos={productosPaginados}
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

      <ModalProducto
        abierto={modalAbierto}
        onClose={() => {
          setModalAbierto(false);
          setImagenesSeleccionadas([]); // limpiar al cerrar
        }}
        modoEditar={modoEditar}
        producto={productoActivo}
        onChange={setProductoActivo}
        onGuardar={guardarProducto}
        imagenesSeleccionadas={imagenesSeleccionadas}
        setImagenesSeleccionadas={setImagenesSeleccionadas}
      />
    </AdminLayout>
  )
}
