'use client';

import { useState } from "react";
import { useRouter } from "next/router";
import FormularioBase from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import FormInput from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import VolverAtras from "@/components/ui/VolverAtras";

export default function RegistroUsuario() {
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        confirmar: "",
    });

    const [error, setError] = useState("");

    // ✅ Función que adapta el tipo correcto para cada campo
    const handleFieldChange = <T extends keyof typeof form>(campo: T) => (valor: typeof form[T]) => {
        setForm(prev => ({
            ...prev,
            [campo]: valor,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.nombre || !form.correo || !form.contraseña || !form.confirmar) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (form.contraseña !== form.confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        localStorage.setItem("usuarioRegistrado", JSON.stringify({
            nombre: form.nombre,
            correo: form.correo,
            contraseña: form.contraseña,
            fechaRegistro: new Date().toISOString().split("T")[0],
        }));

        router.push("/login");
    };

    return (
        <>
        <div className="mb-2">
            <VolverAtras />
        </div>
            <Section className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-[var(--color-principal)]">
                    Crear una cuenta
                </h2>
                <p className="mb-6 text-[var(--color-text-primary)]">
                    Regístrate para recibir beneficios y ofertas especiales.
                </p>

                {error && (
                    <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
                )}

                <FormularioBase onSubmit={handleSubmit}>
                    <FormInput
                        label="Nombre completo"
                        value={form.nombre}
                        onChange={handleFieldChange("nombre")}
                        placeholder="Ej. Juan Pérez"
                    />
                    <FormInput
                        label="Correo electrónico"
                        type="email"
                        value={form.correo}
                        onChange={handleFieldChange("correo")}
                        placeholder="ejemplo@correo.com"
                    />
                    <FormInput
                        label="Contraseña"
                        type="password"
                        value={form.contraseña}
                        onChange={handleFieldChange("contraseña")}
                        placeholder="••••••••"
                    />
                    <FormInput
                        label="Confirmar contraseña"
                        type="password"
                        value={form.confirmar}
                        onChange={handleFieldChange("confirmar")}
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        variant="default"
                        className="mt-4 w-full"
                    >
                        Registrarme
                    </Button>
                </FormularioBase>
            </Section>
        </>
    );
}
