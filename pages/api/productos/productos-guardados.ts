// pages/api/productos-guardados.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  // ✅ Usar prisma.user en lugar de prisma.usuario
  const usuario = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  switch (req.method) {
    case "GET": {
      const guardados = await prisma.productoGuardado.findMany({
        where: { usuarioId: usuario.id },
        include: { producto: true },
      });
      return res.status(200).json(guardados.map((g) => g.producto));
    }

    case "POST": {
      const { productoId } = req.body;
      if (!productoId) {
        return res.status(400).json({ error: "Producto ID es requerido" });
      }

      try {
        await prisma.productoGuardado.create({
          data: {
            usuarioId: usuario.id,
            productoId,
          },
        });
        return res.status(201).json({ ok: true });
      } catch (err) {
        return res.status(400).json({ error: "Ya está guardado o error al guardar" });
      }
    }

    case "DELETE": {
      const { productoId } = req.body;
      if (!productoId) {
        return res.status(400).json({ error: "Producto ID es requerido" });
      }

      await prisma.productoGuardado.deleteMany({
        where: {
          usuarioId: usuario.id,
          productoId,
        },
      });

      return res.status(200).json({ ok: true });
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
