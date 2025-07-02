// pages/api/admin/usuarios/index.ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          verificado: true,
          createdAt: true,
          direccion: true,
          telefono: true,
          ciudad: true,
          pais: true,
          avatar: true,
          fechaNacimiento: true,
        },
      })

      return res.status(200).json(usuarios)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      return res.status(500).json({ message: 'Error del servidor' })
    }
  }

  // ✅ Ahora manejamos POST para crear un nuevo usuario
  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        password,
        role,
        verificado,
        direccion,
        telefono,
        ciudad,
        pais,
        avatar,
        fechaNacimiento,
      } = req.body

      const nuevoUsuario = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role,
          verificado,
          direccion,
          telefono,
          ciudad,
          pais,
          avatar,
          fechaNacimiento,
        },
      })

      return res.status(201).json(nuevoUsuario)
    } catch (error) {
      console.error('Error al crear usuario:', error)
      return res.status(500).json({ message: 'Error al crear usuario' })
    }
  }

  // Método no permitido
  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ message: `Método ${req.method} no permitido` })
}
