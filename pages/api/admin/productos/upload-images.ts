// pages/api/admin/productos/upload-images.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import { prisma } from '@/lib/prisma';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Método no permitido');

  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error al procesar imágenes' });

    const rawId = fields.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;

    const rawIndice = fields.indice;
    const indice = rawIndice !== undefined
      ? parseInt(Array.isArray(rawIndice) ? rawIndice[0] : rawIndice, 10)
      : null;

    const file = files.image || files.images;
    const image = Array.isArray(file) ? file[0] : file;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Falta ID del producto' });
    }

    if (!image || !image.originalFilename) {
      return res.status(400).json({ error: 'No se subió ninguna imagen válida' });
    }

    // ✅ Buscar producto por ID para obtener su referencia
    const producto = await prisma.producto.findUnique({
      where: { id },
    });

    if (!producto || !producto.referencia) {
      return res.status(404).json({ error: 'Producto no encontrado o sin referencia' });
    }

    const referencia = producto.referencia;

    // 🗂️ Crear carpeta con la referencia
    const dir = path.join(process.cwd(), 'public', 'productos', referencia);
    await fs.ensureDir(dir);

    const ext = path.extname(image.originalFilename);
    const fileName = `${Date.now()}_${indice !== null ? indice : 'img'}${ext}`;
    const filePath = path.join(dir, fileName);
    const publicPath = `/productos/${referencia}/${fileName}`;

    await fs.move(image.filepath, filePath);

    const actuales = Array.isArray(producto.imagenesSecundarias)
      ? [...producto.imagenesSecundarias]
      : [];

    if (indice !== null && !isNaN(indice) && indice >= 0 && indice < 5) {
      actuales[indice] = publicPath;
    } else {
      if (actuales.length >= 5) {
        return res.status(400).json({ error: 'Máximo 5 imágenes permitidas' });
      }
      actuales.push(publicPath);
    }

    const updated = await prisma.producto.update({
      where: { id },
      data: {
        imagenesSecundarias: actuales.filter((img) => typeof img === 'string')
      }
    });

    return res.status(200).json({ message: 'Imagen actualizada', imagenesSecundarias: updated.imagenesSecundarias });
  });
}
