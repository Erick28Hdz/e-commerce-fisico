// pages/api/productos/mas-vendidos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. Agrupar y sumar las cantidades vendidas por producto
    const vendidos = await prisma.pedidoItem.groupBy({
      by: ['productoId'],
      _sum: {
        cantidad: true,
      },
      orderBy: {
        _sum: {
          cantidad: 'desc',
        },
      },
      take: 5,
    });

    // 2. Obtener los productos con sus estrellas para calcular rating
    const productos = await prisma.producto.findMany({
      where: {
        id: {
          in: vendidos.map((v) => v.productoId),
        },
      },
      include: {
        Estrella: true,
      },
    });

    // 3. Mapear con rating y mantener el orden de vendidos
    const productosConRating = vendidos.map((v) => {
      const producto = productos.find((p) => p.id === v.productoId)!;
      const total = producto.Estrella.reduce((acc, e) => acc + e.valor, 0);
      const rating = producto.Estrella.length > 0 ? total / producto.Estrella.length : 0;
      const { Estrella, ...resto } = producto;
      return {
        ...resto,
        rating,
      };
    });

    res.status(200).json(productosConRating);
  } catch (error) {
    console.error('Error en /api/productos/mas-vendidos:', error);
    res.status(500).json({ error: 'Error al obtener productos más vendidos' });
  }
}
