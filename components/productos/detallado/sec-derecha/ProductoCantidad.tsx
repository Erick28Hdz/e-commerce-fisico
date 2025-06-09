"use client";
import React, { useState } from "react";
import FormInput from "@/components/ui/Input"; // Ajusta el path si es necesario

export const ProductoCantidad: React.FC = () => {
  const [cantidad, setCantidad] = useState<number>(1);

  return (
    <div className="mt-4 w-32">
      <FormInput<number>
        label="Cantidad"
        value={cantidad}
        onChange={setCantidad}
        min={1}
        type="number"
      />
    </div>
  );
};
