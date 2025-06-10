"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { ModalUniversal } from "@/components/ui/Modal";
import { preguntasFrecuentes } from "@/data/preguntasFrecuentes";
import { TooltipUniversal } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

export function PreguntasFrecuentesModal() {
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState<number | null>(null);

  return (
    <>
      <div className="relative group">
        {/* Tooltip */}
        <TooltipUniversal texto="Preguntas frecuentes">
          <Button
            onClick={() => setAbierto(true)}
            variant="ghost"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </TooltipUniversal>
      </div>

      <ModalUniversal
        abierto={abierto}
        onClose={() => {
          setAbierto(false);
          setActiva(null);
        }}
        titulo="Preguntas frecuentes"
      >
        <div className="space-y-2">
          {preguntasFrecuentes.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[var(--color-bg-secondary)] pb-2 cursor-pointer"
              onClick={() => setActiva(activa === index ? null : index)}
            >
              <div className="flex justify-between items-center text-[var(--color-text-primary)] font-medium">
                <span>{faq.pregunta}</span>
                {activa === index ? (
                  <ChevronUp className="w-4 h-4 text-[var(--color-principal)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[var(--color-principal)]" />
                )}
              </div>
              {activa === index && (
                <p className="mt-1 text-sm text-gray-700">{faq.respuesta}</p>
              )}
            </div>
          ))}
        </div>
      </ModalUniversal>
    </>
  );
}
