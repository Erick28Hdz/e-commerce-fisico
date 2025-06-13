'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface Usuario {
  email: string;
  nombre: string;
}

interface SesionContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
  estaAutenticado: boolean;
}

const SesionContext = createContext<SesionContextType>({
  usuario: null,
  login: () => { },
  logout: () => { },
  estaAutenticado: false,
});

export const useSesion = () => useContext(SesionContext);

export const SesionProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const usuarioGuardado = localStorage.getItem('usuarioLogueado');

      if (usuarioGuardado) {
        const usuarioParseado = JSON.parse(usuarioGuardado);

        if (
          typeof usuarioParseado === 'object' &&
          usuarioParseado !== null &&
          'email' in usuarioParseado &&
          'nombre' in usuarioParseado
        ) {
          setUsuario(usuarioParseado);
        } else {
          localStorage.removeItem('usuarioLogueado');
        }
      }
    } catch (error) {
      console.error("Error al parsear usuarioLogueado:", error);
      localStorage.removeItem('usuarioLogueado');
    }
  }, []);

  const login = (usuario: Usuario) => {
    setUsuario(usuario);
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioLogueado');
    router.replace('/login');
  };

  const estaAutenticado = !!usuario;

  return (
    <SesionContext.Provider value={{ usuario, login, logout, estaAutenticado }}>
      {children}
    </SesionContext.Provider>
  );
};
