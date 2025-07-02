'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";
import AvatarUsuario from "@/components/usuario/AvatarUsuario";
import DatosPersonales from "@/components/usuario/DatosPersonales";
import BotonesPerfil from "@/components/usuario/BotonesPerfil";
import { Section } from "@/components/ui/Section";
import { useSesion } from "@/contexts/SesionContext";

export default function PerfilUsuario() {
  const { usuario, estaAutenticado, cargando } = useSesion();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !estaAutenticado) {
      router.push("/login");
    }
  }, [cargando, estaAutenticado, router]);

  if (cargando) return <p className="text-center mt-10">Cargando sesión...</p>;
  if (!usuario) return null;

  return (
    <Section className="bg-accent rounded-2xl">
      <AvatarUsuario nombre={usuario.nombre} />
      <DatosPersonales correo={""} rol={""} fechaRegistro={""} direccion={""} ciudad={""} pais={""} metodoPago={""} ultimaCompra={""} {...usuario} />
      <BotonesPerfil onLogout={() => router.push("/login")} />
    </Section>
  );
}
