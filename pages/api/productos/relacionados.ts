// pages/api/productos/relacionados.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoria, slug } = req.query;

  if (!categoria || !slug || typeof categoria !== 'string' || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Faltan parámetros válidos' });
  }

  try {
    const productos = await prisma.producto.findMany({
      where: {
        categoria,
        slug: {
          not: slug,
        },
      },
      include: {
        Estrella: true,
      },
      take: 10,
    });

    const productosConRating = productos.map((producto) => {
      const total = producto.Estrella.reduce((acc, estrella) => acc + estrella.valor, 0);
      const rating = producto.Estrella.length > 0 ? total / producto.Estrella.length : 0;

      const { Estrella, ...resto } = producto;
      return { ...resto, rating };
    });

    res.status(200).json(productosConRating);
  } catch (error) {
    console.error('Error en /api/productos/relacionados:', error);
    res.status(500).json({ error: 'Error al obtener productos relacionados' });
  }
}
