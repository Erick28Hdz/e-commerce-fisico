// types/usuario.ts
export interface Usuario {
  id: string
  name: string | null
  email: string
  password: string
  role: 'admin' | 'cliente'
  verificado: boolean
  createdAt: string
  direccion: string | null
  telefono: string | null
  ciudad: string | null
  pais: string | null
  avatar: string | null
  fechaNacimiento: string | null
}