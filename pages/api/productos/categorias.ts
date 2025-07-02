// pages/api/productos/categorias.ts
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const categorias = await prisma.categoria.findMany({
    select: { slug: true, nombre: true },
  });
  res.status(200).json(categorias);
}