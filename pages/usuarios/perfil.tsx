'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AvatarUsuario from "@/components/usuario/AvatarUsuario";
import DatosPersonales from "@/components/usuario/DatosPersonales";
import BotonesPerfil from "@/components/usuario/BotonesPerfil";
import { Section } from "@/components/ui/Section";

type Usuario = {
    nombre: string;
    correo: string;
    rol: string;
    fechaRegistro: string;
    direccion: string;
    ciudad: string;
    pais: string;
    metodoPago: string;
    ultimaCompra: string;
    suscripcionActiva: boolean;
};

export default function PerfilUsuario() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("usuarioLogueado");
        if (email) {
            const mock: Usuario = {
                nombre: "Erick Hernández",
                correo: email,
                rol: "Cliente",
                fechaRegistro: "2024-01-15",
                direccion: "Calle 123, Edificio X",
                ciudad: "Bogotá",
                pais: "Colombia",
                metodoPago: "Visa terminada en 1234",
                ultimaCompra: "2024-07-15",
                suscripcionActiva: true,
            };
            setUsuario(mock);
        } else {
            router.push("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogueado");
        router.push("/login");
    };

    if (!usuario) return null;

    return (
        <Section className="bg-accent rounded-2xl">
            <AvatarUsuario nombre={usuario.nombre} />
            <DatosPersonales {...usuario} />
            <BotonesPerfil onLogout={handleLogout} />
        </Section>
    );
}
