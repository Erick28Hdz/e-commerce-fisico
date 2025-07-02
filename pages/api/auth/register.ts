// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { email, password, name } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(409).json({ error: 'Correo ya registrado' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return res.status(201).json({
    mensaje: 'Usuario registrado correctamente',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  })
}
