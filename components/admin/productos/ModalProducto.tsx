import { Producto } from '@/types/producto'
import { ModalUniversal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

interface ModalProductoProps {
    abierto: boolean
    modoEditar: boolean
    producto: Partial<Producto>
    onClose: () => void
    onChange: (producto: Partial<Producto>) => void
    onGuardar: () => void
    imagenesSeleccionadas: File[]
    setImagenesSeleccionadas: (imagenes: File[]) => void
}

// Simulación de categorías disponibles (puedes reemplazar esto con una consulta real)
const categoriasDisponibles = ['Camisas', 'Pantalones', 'Zapatos', 'Accesorios'];

export default function ModalProducto({
    abierto,
    modoEditar,
    producto,
    onClose,
    onChange,
    onGuardar,
    imagenesSeleccionadas,
    setImagenesSeleccionadas
}: ModalProductoProps) {

    const copiarAlPortapapeles = () => {
        if (producto.imagen) {
            navigator.clipboard.writeText(producto.imagen);
            alert("URL copiada al portapapeles");
        }
    };

    return (
        <ModalUniversal abierto={abierto} onClose={onClose} titulo={modoEditar ? 'Editar Producto' : 'Nuevo Producto'}>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

                <input type="text" placeholder="Nombre" value={producto.nombre || ''} onChange={e => onChange({ ...producto, nombre: e.target.value })} className="w-full border p-2 rounded" />

                <input type="text" placeholder="Slug" value={producto.slug || ''} onChange={e => onChange({ ...producto, slug: e.target.value })} className="w-full border p-2 rounded" />

                <input type="text" placeholder="Referencia" value={producto.referencia || ''} onChange={e => onChange({ ...producto, referencia: e.target.value })} className="w-full border p-2 rounded" />

                <textarea placeholder="Descripción" value={producto.descripcion || ''} onChange={e => onChange({ ...producto, descripcion: e.target.value })} className="w-full border p-2 rounded" />

                <input type="number" placeholder="Precio" value={producto.precio || ''} onChange={e => onChange({ ...producto, precio: parseFloat(e.target.value) })} className="w-full border p-2 rounded" />

                {/* Select de Categoría */}
                <select
                    value={producto.categoria || ''}
                    onChange={e => onChange({ ...producto, categoria: e.target.value })}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Selecciona una categoría</option>
                    {categoriasDisponibles.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                <input type="number" placeholder="Stock" value={producto.stock || ''} onChange={e => onChange({ ...producto, stock: parseInt(e.target.value) })} className="w-full border p-2 rounded" />

                <input
                    type="text"
                    placeholder="Ubicación del producto"
                    value={producto.ubicacion || ''}
                    onChange={e => onChange({ ...producto, ubicacion: e.target.value })}
                    className="w-full border p-2 rounded"
                />

                {/* Color en formato HEX */}
                <div>
                    <label className="block text-sm font-medium mb-1">Color (hex)</label>
                    <input
                        type="color"
                        value={producto.color || '#000000'}
                        onChange={e => onChange({ ...producto, color: e.target.value })}
                        className="w-full border p-2 rounded h-12"
                    />
                </div>

                {/* Imagen principal - solo lectura con botón copiar */}
                <div>
                    <label className="block text-sm font-medium mb-1">URL Imagen principal</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={producto.imagen || ''}
                            readOnly
                            className="w-full border p-2 rounded bg-gray-100 cursor-default"
                        />
                        <Button onClick={copiarAlPortapapeles} size="sm" className="min-w-fit">
                            Copiar
                        </Button>
                    </div>
                </div>

                {/* Input para subir imágenes múltiples */}
                <div>
                    <label className="block text-sm font-medium mb-1">Imágenes del producto (múltiples)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) {
                                setImagenesSeleccionadas(Array.from(e.target.files));
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Preview de imágenes seleccionadas */}
                {imagenesSeleccionadas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {imagenesSeleccionadas.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                className="w-24 h-24 object-cover border rounded"
                            />
                        ))}
                    </div>
                )}

                {producto.referencia && (
                    <p className="text-xs text-gray-500">
                        Ruta imágenes: <code>/productos/{producto.referencia}</code>
                    </p>
                )}

                <Button onClick={onGuardar}>
                    {modoEditar ? 'Guardar Cambios' : 'Crear Producto'}
                </Button>
            </div>
        </ModalUniversal>
    )
}
