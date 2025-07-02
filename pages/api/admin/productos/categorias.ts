import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Método ${req.method} no permitido` })
  }

  try {
    // Extraemos solo el campo de categoría de todos los productos
    const productos = await prisma.producto.findMany({
      select: { categoria: true }
    })

    // Creamos un array con las categorías únicas (filtrando nulos o vacíos)
    const categoriasUnicas = Array.from(new Set(
      productos.map(p => p.categoria.trim().toLowerCase()).filter(Boolean)
    ))

    return res.status(200).json(categoriasUnicas)
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    return res.status(500).json({ error: 'Error al obtener categorías' })
  }
}
