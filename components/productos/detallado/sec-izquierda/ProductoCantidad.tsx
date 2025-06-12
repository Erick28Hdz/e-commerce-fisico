"use client";
import React from "react";
import FormInput from "@/components/ui/Input";

type Props = {
  cantidad: number;
  setCantidad: (value: number) => void;
};

export const ProductoCantidad: React.FC<Props> = ({ cantidad, setCantidad }) => {
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
