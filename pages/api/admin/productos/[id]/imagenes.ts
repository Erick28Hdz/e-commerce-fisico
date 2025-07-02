// /pages/api/admin/productos/[id]/imagenes.ts

import { prisma } from '@/lib/prisma';
import fs from 'fs-extra';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { url } = req.body; // URL de la imagen a eliminar

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL de la imagen es requerida' });
  }

  try {
    const producto = await prisma.producto.findUnique({
      where: { id: id as string }
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const nuevasImagenes = (producto.imagenesSecundarias || []).filter(img => img !== url);

    await prisma.producto.update({
      where: { id: id as string },
      data: { imagenesSecundarias: nuevasImagenes },
    });

    const filePath = path.join(process.cwd(), 'public', url);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
    }

    return res.status(200).json({ ok: true, nuevasImagenes });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
}
