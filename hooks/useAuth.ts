// hooks/useAuth.ts
import { useSession } from 'next-auth/react'

export const useAuth = () => {
  const { data: session, status } = useSession()

  const rol = session?.user?.role || null
  const cargando = status === 'loading'

  return { rol, cargando }
}
