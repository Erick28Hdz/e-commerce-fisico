// components/ui/FormularioBase.tsx
import React, { ReactNode } from "react";
import { Button } from "./Button";

interface FormularioBaseProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
}

export default function FormularioBase({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl mx-auto">
      {children}
    </form>
  );
}
