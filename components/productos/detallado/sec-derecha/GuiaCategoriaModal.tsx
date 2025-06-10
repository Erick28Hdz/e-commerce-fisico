"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { ModalUniversal } from "@/components/ui/Modal";
import { TooltipUniversal } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { GuiaCategoria } from "./GuiaCategoria";

interface Props {
    categoria: string;
}

export function GuiaCategoriaModal({ categoria }: Props) {
    const [abierto, setAbierto] = useState(false);

    return (
        <>
            <div className="relative group"><TooltipUniversal texto="Ver guía detallada">
                <Button onClick={() => setAbierto(true)} variant="ghost">
                    <HelpCircle className="w-5 h-5" />
                </Button>
            </TooltipUniversal>
            </div>

            <ModalUniversal
                abierto={abierto}
                onClose={() => setAbierto(false)}
                titulo="Guía"
            >
                <GuiaCategoria categoria={categoria} />
            </ModalUniversal>
        </>
    );
}
