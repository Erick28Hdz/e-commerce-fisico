// pages/api/admin/productos/[id].ts
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs-extra';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const producto = await prisma.producto.findUnique({
        where: { id: id as string },
      });
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      return res.status(200).json(producto);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }

  if (req.method === 'PUT') {
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
      } = req.body;

      const updatedProducto = await prisma.producto.update({
        where: { id: id as string },
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
      });

      return res.status(200).json(updatedProducto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      // 1. Obtener el producto para conocer su referencia
      const producto = await prisma.producto.findUnique({
        where: { id: id as string },
        select: { referencia: true }
      });

      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // 2. Eliminar el producto
      await prisma.producto.delete({
        where: { id: id as string }
      });

      // 3. Eliminar la carpeta de imágenes
      const dir = path.join(process.cwd(), 'public', 'productos', producto.referencia);
      await fs.remove(dir);

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Método ${req.method} no permitido` });
}
