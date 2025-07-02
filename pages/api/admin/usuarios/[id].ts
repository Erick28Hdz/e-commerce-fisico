// pages/api/admin/usuarios/[id].ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const {
        name,
        email,
        role,
        verificado,
        telefono,
        ciudad,
        pais,
        direccion,
        fechaNacimiento,
      } = req.body

      const updatedUser = await prisma.user.update({
        where: { id: id as string },
        data: {
          name,
          email,
          role,
          verificado,
          telefono,
          ciudad,
          pais,
          direccion,
          fechaNacimiento,
        },
      })

      return res.status(200).json(updatedUser)
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      return res.status(500).json({ error: 'Error al actualizar usuario' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: id as string },
      })
      return res.status(200).json({ ok: true })
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      return res.status(500).json({ error: 'Error al eliminar usuario' })
    }
  }

  // Si llega otro método, se responde con 405
  res.setHeader('Allow', ['PUT', 'DELETE'])
  return res.status(405).json({ error: `Método ${req.method} no permitido` })
}
