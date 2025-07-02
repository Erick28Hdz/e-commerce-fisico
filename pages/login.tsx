'use client';

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Section } from "@/components/ui/Section";
import FormularioBase from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import FormInput from "@/components/ui/Input";
import { Link } from "@/components/ui/Link";

export default function LoginUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleGoToRegister = () => {
    router.push("/register");
  };

  return (
    <Section className="flex items-center justify-center">
      <FormularioBase onSubmit={handleLogin}>
        <h2 className="text-[var(--color-principal)] text-center mb-4 text-2xl font-bold">
          Iniciar sesión
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm font-semibold">{error}</p>
        )}

        <FormInput
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="ej: erick@correo.com"
        />

        <FormInput
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Tu contraseña"
        />

        <div className="flex gap-4 p-2">
          <Button variant="default" className="w-full" type="submit">
            Entrar
          </Button>

          <Button variant="default" className="w-full" type="button" onClick={handleGoToRegister}>
            Registrarse
          </Button>
        </div>

        <div className="text-center">
          <Link variant="ghost" href="/usuarios/olvide-password">
            ¿Olvidó la contraseña?
          </Link>
        </div>
      </FormularioBase>
    </Section>
  );
}
