import { createContext, useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface Usuario {
  email: string;
  nombre: string;
  image?: string;
  id?: string;
  rol?: 'admin' | 'cliente'
}

interface SesionContextType {
  usuario: Usuario | null;
  logout: () => void;
  estaAutenticado: boolean;
  cargando: boolean; // 👈 nuevo
}

const SesionContext = createContext<SesionContextType>({
  usuario: null,
  logout: () => {},
  estaAutenticado: false,
  cargando: true, // 👈 nuevo valor por defecto
});

export const useSesion = () => useContext(SesionContext);

export const SesionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const usuario: Usuario | null = session?.user
    ? {
        email: session.user.email || '',
        nombre: session.user.name || '',
        image: session.user.image || '',
        id: (session.user as any).id || '',
        rol: (session.user as any).role || 'cliente',
      }
    : null;

  const estaAutenticado = status === 'authenticated';
  const cargando = status === 'loading'; // 👈

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <SesionContext.Provider value={{ usuario, logout, estaAutenticado, cargando }}>
      {children}
    </SesionContext.Provider>
  );
};
