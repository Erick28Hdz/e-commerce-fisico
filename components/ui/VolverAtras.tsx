"use client";

import { useRouter } from "next/router";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";

interface VolverAtrasProps {
  rutaPersonalizada?: string; // Opcional
}

export default function VolverAtras({ rutaPersonalizada }: VolverAtrasProps) {
  const router = useRouter();

  const manejarVolver = () => {
    if (rutaPersonalizada) {
      router.push(rutaPersonalizada);
    } else {
      router.back(); // Vuelve a la página anterior
    }
  };

  return (
    <div className="mb-2">
      <Button onClick={manejarVolver} variant="ghost">
        <ArrowLeft className="w-5 h-5 mr-1" />
      </Button>
    </div>
  );
}
