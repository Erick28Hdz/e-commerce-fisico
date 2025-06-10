"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  abierto: boolean;
  onClose: () => void;
  titulo?: string;
  children: ReactNode;
}

export function ModalUniversal({ abierto, onClose, titulo, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!abierto) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="bg-[var(--color-bg-light)] rounded-xl shadow-xl w-full max-w-xl p-6 animate-fadeIn relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-principal)] hover:text-red-500 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título opcional */}
        {titulo && (
          <h3
            id="modal-title"
            className="text-[var(--color-principal)] mb-4 text-center"
          >
            {titulo}
          </h3>
        )}

        {/* Contenido */}
        <div className="text-[var(--color-text-primary)] space-y-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
