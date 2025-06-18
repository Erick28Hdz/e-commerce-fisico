'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Section } from '@/components/ui/Section';
import FormularioBase from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import FormInput from '@/components/ui/Input'; 

type Usuario = {
  nombre: string;
  correo: string;
  rol: string;
  fechaRegistro: string;
  direccion: string;
  ciudad: string;
  estado?: string;
  pais: string;
  codigoPostal?: string;
  telefono?: string;
  genero?: 'Masculino' | 'Femenino' | 'Otro' | '';
  fechaNacimiento?: string;
  avatarUrl?: string;
  metodoPago: string;
  ultimaCompra: string;
  suscripcionActiva: boolean;
  newsletter?: boolean;
};

export default function EditarPerfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
  const cargarDatos = async () => {
    const email = localStorage.getItem('usuarioLogueado');
    if (!email) {
      router.push('/login');
      return;
    }

    const datosGuardados = localStorage.getItem(`usuario_${email}`);
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    } else {
      const mock: Usuario = {
        nombre: 'Erick Hernández',
        correo: email,
        rol: 'Cliente',
        fechaRegistro: '2024-01-15',
        direccion: '',
        ciudad: '',
        estado: '',
        pais: 'Colombia',
        codigoPostal: '',
        telefono: '',
        genero: '',
        fechaNacimiento: '',
        avatarUrl: '',
        metodoPago: '',
        ultimaCompra: '',
        suscripcionActiva: true,
        newsletter: false,
      };
      localStorage.setItem(`usuario_${email}`, JSON.stringify(mock));
      setUsuario(mock);
    }
  };

  cargarDatos(); // ✅ Aquí se llama la función async
}, []);

  const updateField = <K extends keyof Usuario>(key: K, value: Usuario[K]) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [key]: value });
  };

  const guardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    localStorage.setItem(`usuario_${usuario.correo}`, JSON.stringify(usuario));
    alert('Perfil actualizado correctamente');
    router.push('/perfil');
  };

  if (!usuario) return null;

  return (
    <Section className=" p-6 rounded-xl shadow-md ">
      <h2 className="text-2xl font-bold text-[var(--color-principal)] mb-6 text-center">Editar Perfil</h2>

      <FormularioBase onSubmit={guardarCambios}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre completo"
            value={usuario.nombre}
            onChange={(v) => updateField('nombre', v)}
          />
          <FormInput
            label="Correo electrónico"
            value={usuario.correo}
            onChange={(v) => updateField('correo', v)}
            type="email"
          />
          <FormInput
            label="Teléfono"
            value={usuario.telefono || ''}
            onChange={(v) => updateField('telefono', v)}
            type="text"
          />
          <FormInput
            label="Fecha de nacimiento"
            value={usuario.fechaNacimiento || ''}
            onChange={(v) => updateField('fechaNacimiento', v)}
            type="date"
          />
          <div className="flex flex-col">
            <label htmlFor="genero" className="mb-2 font-semibold text-[var(--color-text-primary)]">Género</label>
            <select
              name="genero"
              value={usuario.genero || ''}
              onChange={(e) => updateField('genero', e.target.value as Usuario['genero'])}
              className="border-2 p-2 rounded-md bg-[var(--color-bg-secondary)] text-[var(--color-principal)]"
            >
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <FormInput
            label="Dirección"
            value={usuario.direccion}
            onChange={(v) => updateField('direccion', v)}
          />
          <FormInput
            label="Ciudad"
            value={usuario.ciudad}
            onChange={(v) => updateField('ciudad', v)}
          />
          <FormInput
            label="Estado"
            value={usuario.estado || ''}
            onChange={(v) => updateField('estado', v)}
          />
          <FormInput
            label="País"
            value={usuario.pais}
            onChange={(v) => updateField('pais', v)}
          />
          <FormInput
            label="Código Postal"
            value={usuario.codigoPostal || ''}
            onChange={(v) => updateField('codigoPostal', v)}
          />
          <FormInput
            label="Método de pago"
            value={usuario.metodoPago}
            onChange={(v) => updateField('metodoPago', v)}
          />
          <FormInput
            label="Última compra"
            value={usuario.ultimaCompra}
            onChange={(v) => updateField('ultimaCompra', v)}
            type="date"
          />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="newsletter"
            checked={usuario.newsletter || false}
            onChange={(e) => updateField('newsletter', e.target.checked)}
          />
          <label htmlFor="newsletter" className="text-sm text-[var(--color-text-primary)]">
            Deseo recibir novedades y promociones
          </label>
        </div>

        <div className="mt-6 flex justify-center">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </FormularioBase>
    </Section>
  );
}
