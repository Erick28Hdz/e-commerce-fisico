// pages/api/pedidos/historial.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const pedidos = await prisma.pedido.findMany({
    where: { userId: user.id },
    orderBy: { fecha: "desc" },
    include: {
      items: {
        include: {
          producto: true,
        },
      },
    },
  });

  const formatoSimplificado = pedidos.map((p) => ({
    id: p.id,
    estado: p.estado,
    total: p.total,
    fecha: p.fecha,
    productos: p.items.map((item) => ({
      nombre: item.producto.nombre,
      imagen: item.producto.imagen,
      cantidad: item.cantidad,
      precio: item.precioUnit,
    })),
  }));

  return res.status(200).json(formatoSimplificado);
}
