import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const productos = await prisma.producto.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return res.status(200).json(productos)
    } catch (error) {
      console.error('Error al obtener productos:', error)
      return res.status(500).json({ error: 'Error al obtener productos' })
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        nombre,
        slug,
        referencia,
        descripcion,
        precio,
        precioAntiguo,
        descuento,
        mensaje,
        imagen,
        imagenesSecundarias,
        stock,
        variantes,
        color,
        categoria,
        tiempoEnvioDias,
        ubicacion,
        limiteStockVisible
      } = req.body

      const nuevoProducto = await prisma.producto.create({
        data: {
          nombre,
          slug,
          referencia,
          descripcion,
          precio,
          precioAntiguo,
          descuento,
          mensaje,
          imagen,
          imagenesSecundarias,
          stock,
          variantes,
          color,
          categoria,
          tiempoEnvioDias,
          ubicacion,
          limiteStockVisible
        }
      })

      return res.status(201).json(nuevoProducto)
    } catch (error) {
      console.error('Error al crear producto:', error)
      return res.status(500).json({ error: 'Error al crear producto' })
    }
  }

  return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Método ${req.method} no permitido`)
}
