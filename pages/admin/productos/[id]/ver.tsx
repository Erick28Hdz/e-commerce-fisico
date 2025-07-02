import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Producto } from '@/types/producto';
import VolverAtras from '@/components/ui/VolverAtras';
import { ProductoImagen } from '@/components/productos/tarjeta/ProductoImagen';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import UploadImagenesProducto from '@/components/ui/UploadImages';

export default function VerProductoPage() {
  const router = useRouter();
  const { id } = router.query;

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducto = async () => {
    if (!id) return;
    const res = await fetch(`/api/admin/productos/${id}`);
    const data = await res.json();
    setProducto(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;

    const fetchProducto = async () => {
      const res = await fetch(`/api/admin/productos/${id}`);
      const data = await res.json();
      setProducto(data);
      setLoading(false);
    };

    fetchProducto();
  }, [id]);

  if (loading || !producto) {
    return (
      <AdminLayout>
        <p>Cargando producto...</p>
      </AdminLayout>
    );
  }

  const establecerComoPrincipal = async (url: string) => {
    if (!producto) return;

    const res = await fetch(`/api/admin/productos/${producto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...producto, imagen: url }),
    });

    if (res.ok) {
      const data = await res.json();
      setProducto(data);
      alert('Imagen principal actualizada');
    } else {
      alert('Error al actualizar la imagen principal');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className='flex'>
          <VolverAtras></VolverAtras>
          <h3 className="text-3xl font-bold">{producto.nombre}</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Información general */}
          <div className="space-y-2">
            <p><strong>Referencia:</strong> {producto.referencia}</p>
            <p><strong>Slug:</strong> {producto.slug}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> {producto.precio !== null && producto.precio !== undefined ? `$${producto.precio.toFixed(2)}` : '—'}</p>
            <p><strong>Precio antiguo:</strong> {producto.precioAntiguo ? `$${producto.precioAntiguo.toFixed(2)}` : '—'}</p>
            <p><strong>Descuento:</strong> {producto.descuento ? `${producto.descuento}%` : '—'}</p>
            <p><strong>Mensaje:</strong> {producto.mensaje || '—'}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Color:</strong> {producto.color}</p>
            <p><strong>Ubicación:</strong> {producto.ubicacion || '—'}</p>
            <p><strong>Tiempo de envío:</strong> {producto.tiempoEnvioDias || '—'} días</p>
            <p><strong>Límite stock visible:</strong> {producto.limiteStockVisible || '—'}</p>
          </div>

          {/* Imagen principal */}
          <div className="space-y-2">
            <h4>Imagen principal</h4>
            <ProductoImagen
              src={producto.imagen}
              alt="Imagen principal"
              className="h-64"
            />
          </div>
        </div>

        {/* Imágenes secundarias */}
        <div>
          <h4 className="mb-2">Imágenes secundarias</h4>
          {!producto.imagenesSecundarias || producto.imagenesSecundarias.length === 0 ? (
            <p className="text-gray-500">No hay imágenes secundarias.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {producto.imagenesSecundarias.map((url, i) => {
                const esPrincipal = producto.imagen === url;

                return (
                  <div
                    key={i}
                    className={`relative group border rounded shadow ${esPrincipal
                      ? 'border-[var(--color-principal)]'
                      : 'border-[var(--color-bg-secondary)]'
                      }`}
                  >
                    <ProductoImagen
                      src={url}
                      alt={`Imagen secundaria ${i}`}
                      className="h-32"
                    />

                    {esPrincipal && (
                      <div
                        className="absolute top-1 left-1 text-xs px-2 py-1 rounded shadow"
                        style={{
                          backgroundColor: 'var(--color-principal)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        Imagen principal
                      </div>
                    )}

                    {/* ✅ Botón eliminar */}
                    <Button
                      onClick={async () => {
                        const confirmado = confirm("¿Estás seguro de eliminar esta imagen?");
                        if (!confirmado) return;

                        const res = await fetch(`/api/admin/productos/${producto.id}/imagenes`, {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ url }),
                        });

                        if (res.ok) {
                          await fetchProducto(); // <-- fuerza la actualización completa
                        } else {
                          alert("Error al eliminar imagen");
                        }
                      }}
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 p-1 text-xs"
                    >
                      🗑️
                    </Button>

                    {/* Botón elegir como principal */}
                    <Button
                      onClick={() => establecerComoPrincipal(url)}
                      variant="default"
                      size="sm"
                      className={cn(
                        "absolute bottom-2 left-1/2 -translate-x-1/2",
                        "max-w-[90%] w-fit px-3 py-1 text-xs",
                        "opacity-0 group-hover:opacity-100 transition",
                        "whitespace-nowrap text-center truncate shadow-md"
                      )}
                    >
                      Elegir principal
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Subida de nuevas imágenes */}
        <div className="mt-6">
          <UploadImagenesProducto
            id={producto.id}
            onUploadSuccess={fetchProducto}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
