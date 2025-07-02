// pages/api/productos/index.ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoria } = req.query;

  try {
    const productos = await prisma.producto.findMany({
      where: categoria && categoria !== 'Todos' ? { categoria: String(categoria) } : {},
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
}