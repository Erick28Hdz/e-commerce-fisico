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
}

// 👉 Valor por defecto (solo para evitar errores al crear el contexto)
const SesionContext = createContext<SesionContextType>({
  usuario: null,
  login: () => { },
  logout: () => { },
});

// ✅ Hook personalizado para consumir el contexto
export const useSesion = () => useContext(SesionContext);

// ✅ Componente proveedor de contexto
export const SesionProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    try {
      const usuarioGuardado = localStorage.getItem('usuarioLogueado');

      if (usuarioGuardado) {
        const usuarioParseado = JSON.parse(usuarioGuardado);

        // Validamos que el objeto tenga la estructura esperada
        if (
          typeof usuarioParseado === 'object' &&
          usuarioParseado !== null &&
          'email' in usuarioParseado &&
          'nombre' in usuarioParseado
        ) {
          setUsuario(usuarioParseado);
        } else {
          // Si no es válido, limpiamos
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
    router.replace('/login'); // 🔁 redirige sin posibilidad de volver
  };

  return (
    <SesionContext.Provider value={{ usuario, login, logout }}>
      {children}
    </SesionContext.Provider>
  );
};
