"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { ModalUniversal } from "@/components/ui/Modal";
import { garantiaYPoliticas } from "@/data/garantiaYPoliticas";
import { Button } from "@/components/ui/Button";
import { TooltipUniversal } from "@/components/ui/Tooltip";

export function GarantiaModal() {
    const [abierto, setAbierto] = useState(false);

    return (
        <>
            <div className="relative group">
                {/* Tooltip */}
                <TooltipUniversal texto="Garantía y políticas">
                    <Button
                        onClick={() => setAbierto(true)}
                        variant="ghost"
                    >
                        <ShieldCheck className="w-5 h-5" />
                    </Button>
                </TooltipUniversal>
            </div>

            <ModalUniversal
                abierto={abierto}
                onClose={() => setAbierto(false)}
                titulo="Garantía y políticas"
            >
                <div className="space-y-4">
                    <p className="text-[var(--color-text-primary)] font-medium">
                        {garantiaYPoliticas.resumen}
                    </p>
                    {garantiaYPoliticas.detalles.map((item, index) => (
                        <div key={index}>
                            <h4 className="text-[var(--color-principal)] font-semibold mb-1">{item.titulo}</h4>
                            <p className="text-sm text-gray-700">{item.contenido}</p>
                        </div>
                    ))}
                </div>
            </ModalUniversal>
        </>
    );
}
