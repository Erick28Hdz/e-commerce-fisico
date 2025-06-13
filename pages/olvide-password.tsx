'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import FormularioBase from '@/components/ui/Form';
import FormInput from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import VolverAtras from '@/components/ui/VolverAtras';

export default function OlvidePassword() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@')) {
            setError('Ingresa un correo válido');
            return;
        }

        // Simular envío
        setMensaje('Se ha enviado un enlace de recuperación al correo proporcionado');
        setError('');
        setEmail('');

        // Simular redirección opcional después de unos segundos
        setTimeout(() => {
            router.push('/login');
        }, 4000);
    };

    return (
        <>
            <div className="mb-2">
                <VolverAtras />
            </div>
            <Section className="flex justify-center items-center">
                <FormularioBase onSubmit={handleSubmit}>
                    <h2 className="text-[var(--color-principal)] text-center mb-4">
                        Recuperar contraseña
                    </h2>

                    {mensaje && <p className="text-green-600 text-sm mb-4">{mensaje}</p>}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    <FormInput
                        label="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="ej: erick@correo.com"
                    />

                    <Button variant="default" className="w-full mt-4">
                        Enviar enlace de recuperación
                    </Button>
                </FormularioBase>
            </Section>
        </>
    );
}
