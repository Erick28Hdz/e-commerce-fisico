"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { ModalUniversal } from "@/components/ui/Modal";
import { TooltipUniversal } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { Tabla } from "@/components/ui/Tabla";
import { guiasPorCategoria } from "@/data/guias";

interface Props {
  categoria: string;
}

export function GuiaCategoriaModal({ categoria }: Props) {
  const [abierto, setAbierto] = useState(false);
  const guia = guiasPorCategoria[categoria as keyof typeof guiasPorCategoria];

  if (!guia) return null;

  return (
    <>
      {/* Botón de ayuda con tooltip */}
      <div className="relative group">
        <TooltipUniversal texto="Ver guía detallada">
          <Button onClick={() => setAbierto(true)} variant="ghost">
            <BookOpen className="w-5 h-5" />
          </Button>
        </TooltipUniversal>
      </div>

      {/* Modal con contenido de la guía */}
      <ModalUniversal
        abierto={abierto}
        onClose={() => setAbierto(false)}
        titulo="Guía"
      >
        <div>
          {"columnas" in guia && "filas" in guia ? (
            <div className="overflow-x-auto">
              <Tabla
                titulo={guia.titulo}
                columnas={"columnas" in guia ? guia.columnas : undefined}
                filas={"filas" in guia ? guia.filas : undefined}
                lista={"lista" in guia && Array.isArray(guia.lista) ? guia.lista as string[] : undefined}
              />
            </div>
          ) : "lista" in guia ? (
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.25rem",
                fontSize: "1.10rem",
                color: "var(--color-text-primary)",
              }}
            >
              {guia.lista.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </ModalUniversal>
    </>
  );
}
