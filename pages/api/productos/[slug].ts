// pages/api/productos/[slug].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug inválido' });
  }

  try {
    const producto = await prisma.producto.findUnique({
      where: { slug },
      include: { Estrella: true },
    });

    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const total = producto.Estrella.reduce((acc, e) => acc + e.valor, 0);
    const rating = producto.Estrella.length > 0 ? total / producto.Estrella.length : 0;

    const { Estrella, ...resto } = producto;

    res.status(200).json({
      ...resto,
      calificacion: rating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}
