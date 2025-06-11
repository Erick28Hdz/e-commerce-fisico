"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { heroData } from "@/data/heroData";

export default function HeroCarrusel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const slide = heroData[indice];

  return (
    <div className="relative w-full h-64 md:h-[20rem] rounded-xl overflow-hidden shadow-2xl mb-8">
      <Image
        src={slide.imagen}
        alt={slide.titulo}
        fill
        className="object-cover object-center transition-opacity duration-700"
        priority
      />

      {/* Gradiente oscuro encima de la imagen */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.4), transparent)",
        }}
      />

      {/* Contenido sobre la imagen */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-16 text-left">
        <h3
          className="font-bold mb-4 tracking-wide"
          style={{
            color: "var(--color-accent)",
            fontSize: "clamp(2rem, 4vw + 1rem, 3rem)",
            fontFamily: "var(--font-subtitle-family)",
            lineHeight: "1.1",
            textShadow: `
              -1px -1px 0 var(--color-text-primary),
              1px -1px 0 var(--color-text-primary),
              -1px 1px 0 var(--color-text-primary),
              1px 1px 0 var(--color-text-primary)
            `,
          }}
        >
          {slide.titulo}
        </h3>
        <p
          className="max-w-2xl drop-shadow-md"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "clamp(1rem, 2vw + 0.5rem, 1.25rem)",
            fontFamily: "var(--font-text-family)",
            lineHeight: "1.6",
          }}
        >
          {slide.descripcion}
        </p>
      </div>
    </div>
  );
}
