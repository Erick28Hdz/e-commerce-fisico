import { useState } from "react";
import { ProductoImagen } from "../tarjeta/ProductoImagen";
import { GaleriaMiniaturas } from "./sec-izquierda/GaleriaMiniaturas";

export function GaleriaProducto({
  imagenPrincipal,
  imagenesSecundarias = [],
  alt,
}: {
  imagenPrincipal: string;
  imagenesSecundarias?: string[];
  alt: string;
}) {
  const imagenes = [imagenPrincipal, ...imagenesSecundarias];
  const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenPrincipal);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <ProductoImagen
        src={imagenSeleccionada}
        alt={alt}
        className="w-full h-[400px] border"
      />
      <GaleriaMiniaturas
        imagenes={imagenes}
        imagenSeleccionada={imagenSeleccionada}
        setImagenSeleccionada={setImagenSeleccionada}
        alt={alt}
      />
    </div>
  );
}
