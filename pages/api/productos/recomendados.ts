// pages/api/productos/recomendados.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Obtener productos recientes con estrellas
    const productos = await prisma.producto.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        Estrella: true,
      },
    });

    // 2. Calcular promedio de calificación para cada producto
    const productosConRating = productos.map((producto) => {
      const total = producto.Estrella.reduce((acc, estrella) => acc + estrella.valor, 0);
      const rating = producto.Estrella.length > 0 ? total / producto.Estrella.length : 0;

      const { Estrella, ...resto } = producto; // eliminamos el array para no enviarlo
      return {
        ...resto,
        rating,
      };
    });

    // 3. Enviar respuesta
    res.status(200).json(productosConRating);
  } catch (error) {
    console.error('Error al obtener productos recomendados:', error);
    res.status(500).json({ error: 'Error al obtener productos recomendados' });
  }
}
