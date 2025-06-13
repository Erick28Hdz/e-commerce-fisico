import React, { useState } from "react";
import { Heart, Share2, X, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link"
import { TooltipUniversal } from "@/components/ui/Tooltip";
import { useProductoGuardado } from "@/hooks/useProductoGuardado";
import type { Producto } from "@/data/productosMock";

type Props = {
  producto: Producto;
};

export const ProductoAcciones: React.FC<Props> = ({ producto }) => {
  const { guardado, toggleGuardado } = useProductoGuardado(producto);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const redes = [
    { nombre: "Facebook", icono: <Facebook size={16} />, href: "https://facebook.com/sharer?u=https://tuweb.com" },
    { nombre: "Twitter", icono: <Twitter size={16} />, href: "https://twitter.com/share?url=https://tuweb.com" },
    { nombre: "LinkedIn", icono: <Linkedin size={16} />, href: "https://linkedin.com/shareArticle?url=https://tuweb.com" },
    { nombre: "Correo", icono: <Mail size={16} />, href: "mailto:?subject=Mira esto&body=https://tuweb.com" },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4 relative">
      <div className="flex">
        <TooltipUniversal texto="Guardar producto">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleGuardado}
            className={guardado ? "text-red-600" : "text-[var(--color-principal)]"}
          >
            <Heart fill={guardado ? "red" : "none"} size={22} />
          </Button>
        </TooltipUniversal>

        <TooltipUniversal texto="Compartir producto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
            className="text-[var(--color-principal)]"
          >
            <Share2 size={22} />
          </Button>
        </TooltipUniversal>
      </div>

      {mostrarOpciones && (
        <div className="absolute top-10 right-0 z-10 w-40 rounded-lg shadow-md p-3"
          style={{
            backgroundColor: "var(--color-bg-light)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-text-primary)"
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[var(--color-principal)]">Compartir en:</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMostrarOpciones(false)}
              className="text-[var(--color-principal)] hover:text-[var(--color-accent)]"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {redes.map((red) => (
              <Link
                key={red.nombre}
                href={red.href}
                variant="ghost"
                className="flex items-center gap-2 text-sm justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                {red.icono} {red.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
