import { useRouter } from 'next/router'
import { Producto } from '@/types/producto'
import { Tabla } from '@/components/ui/Tabla'
import { Button } from '@/components/ui/Button'

interface TablaProductosProps {
    productos: Producto[]
    onEditar: (producto: Producto) => void
    onEliminar: (id: string) => void
}

export default function TablaProductos({
    productos,
    onEditar,
    onEliminar
}: TablaProductosProps) {
    const router = useRouter()

    const columnas = [
        'Nombre',
        'Slug',
        'Referencia',
        'Descripción',
        'Precio',
        'Precio Antiguo',
        'Descuento',
        'Mensaje',
        'Stock',
        'Color',
        'Categoría',
        'Envío (días)',
        'Ubicación',
        'Stock Visible',
        'Imagen principal',
        '# Imágenes secundarias',
        'Registrado'
    ]

    const filas: string[][] = productos.map(producto => [
        producto.nombre,
        producto.slug,
        producto.referencia,
        producto.descripcion,
        `$${producto.precio.toFixed(2)}`,
        producto.precioAntiguo ? `$${producto.precioAntiguo.toFixed(2)}` : '—',
        producto.descuento ? `${producto.descuento}%` : '—',
        producto.mensaje || '—',
        producto.stock.toString(),
        producto.color,
        producto.categoria,
        producto.tiempoEnvioDias?.toString() || '—',
        producto.ubicacion || '—',
        producto.limiteStockVisible?.toString() || '—',
        producto.imagen || '—',
        producto.imagenesSecundarias?.length?.toString() || '0',
        new Date(producto.createdAt).toLocaleDateString()
    ])

    const acciones = productos.map(p => (
        <div key={p.id} className="flex gap-2 justify-center">
            <Button
                onClick={() => router.push(`/admin/productos/${p.id}/ver`)}
                size="sm"
                variant="outline"
            >
                Ver producto
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEditar(p)}>
                Editar
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onEliminar(p.id)}>
                Eliminar
            </Button>
        </div>
    ))

    return (
        <Tabla
            titulo="Lista de productos"
            columnas={columnas}
            filas={filas}
            acciones={acciones}
        />
    )
}
