"use client";

import { useState } from "react";
import FormularioBase from "../ui/Form";
import FormInput from "../ui/Input";
import { Button } from "../ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="rounded py-12 px-6 bg-[var(--color-bg-light)] text-[var(--color-text-primary)] text-center">
      <h3 className="text-3xl font-bold mb-3 text-[var(--color-principal)]">
        Suscríbete a nuestro boletín
      </h3>

      <p className="mb-6 text-lg text-[var(--color-text-primary)]">
        Recibe <span className="font-semibold">ofertas exclusivas</span> y novedades directamente en tu correo.
      </p>

      <FormularioBase>
        <FormInput
          label=""
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Tu correo electrónico"
        />

        <Button
          variant="outline"
          className="bg-[var(--color-principal)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent)] px-6 py-2 rounded-lg text-base font-semibold transition"
        >
          Suscribirme
        </Button>
      </FormularioBase>
    </section>
  );
}
