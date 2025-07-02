import { useState, useEffect } from 'react';
import { Button } from './Button';
import FormInput from './Input';

interface Props {
  id: string;
  onUploadSuccess?: () => void;
}

export default function UploadImagenesProducto({ id, onUploadSuccess }: Props) {
  const [imagenesActuales, setImagenesActuales] = useState<string[]>([]);
  const [referencia, setReferencia] = useState<string | null>(null);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState<number | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`/api/admin/productos/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setImagenesActuales(data.imagenesSecundarias || []);
      setReferencia(data.referencia || null);
    };
    if (id) fetchProducto();
  }, [id]);

  const subir = async () => {
    if (!archivo || indiceSeleccionado === null || !referencia) {
      alert('Falta imagen, índice o referencia del producto');
      return;
    }

    setSubiendo(true);

    const formData = new FormData();
    formData.append('image', archivo);
    formData.append('id', id);
    formData.append('indice', indiceSeleccionado.toString());

    const res = await fetch('/api/admin/productos/upload-images', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setSubiendo(false);

    if (res.ok) {
      alert('Imagen reemplazada con éxito');
      setArchivo(null);
      setIndiceSeleccionado(null);
      setImagenesActuales(data.imagenesSecundarias || []);
      if (onUploadSuccess) onUploadSuccess();
    } else {
      alert(data.error || 'Error al subir imagen');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Imágenes actuales: {imagenesActuales?.length || 0} / 5
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => {
          const url = imagenesActuales[i];
          const seleccionado = i === indiceSeleccionado;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndiceSeleccionado(i)}
              className={`relative border-2 rounded overflow-hidden transition-all ${seleccionado ? 'border-[var(--color-principal)]' : 'border-gray-300'
                }`}
            >
              {url ? (
                <img src={url} alt={`img-${i}`} className="w-full h-24 object-cover" />
              ) : (
                <div className="w-full h-24 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                  Vacío ({i})
                </div>
              )}
              <div className="absolute bottom-0 w-full text-xs text-center py-1 bg-white bg-opacity-80">
                {seleccionado ? 'Seleccionado' : `Posición ${i}`}
              </div>
            </button>
          );
        })}
      </div>

      <div className='flex gap-6'>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setArchivo(e.target.files[0]);
            }
          }}
          className="w-full border p-2 rounded"
        />

        <Button
          onClick={subir}
          disabled={!archivo || indiceSeleccionado === null || subiendo}
          variant="default"
          className="w-full"
        >
          {subiendo ? 'Subiendo...' : 'Reemplazar imagen'}
        </Button>
      </div>
    </div>
  );
}