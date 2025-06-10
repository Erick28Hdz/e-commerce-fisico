// components/productos/detallado/sec-derecha/GuiaCategoria.tsx
import React from "react";
import { guiasPorCategoria } from "@/data/guias";

interface Props {
  categoria: string;
}

export const GuiaCategoria: React.FC<Props> = ({ categoria }) => {
  const guia = guiasPorCategoria[categoria as keyof typeof guiasPorCategoria];
  if (!guia) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{guia.titulo}</h3>

      {"columnas" in guia && "filas" in guia ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-collapse border-gray-300 text-sm">
            <thead>
              <tr>
                {guia.columnas.map((columna, i) => (
                  <th key={i} className="border px-2 py-1 bg-gray-100">{columna}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guia.filas.map((fila, i) => (
                <tr key={i}>
                  {fila.map((valor, j) => (
                    <td key={j} className="border px-2 py-1 text-center">{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : "lista" in guia ? (
        <ul className="list-disc pl-5 text-sm space-y-1">
          {guia.lista.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
