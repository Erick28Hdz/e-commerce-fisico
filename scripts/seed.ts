// scripts/seed.ts
const { PrismaClient } = require('@prisma/client')
const { categoriasMock } = require('../data/categoriasMock')
const { productosMock } = require('../data/productosMock')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  for (const categoria of categoriasMock) {
    await prisma.categoria.upsert({
      where: { slug: categoria.slug },
      update: {},
      create: {
        slug: categoria.slug,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
    })
  }

  for (const producto of productosMock) {
    await prisma.producto.upsert({
      where: { slug: producto.slug },
      update: {},
      create: {
        id: producto.id,
        nombre: producto.nombre,
        slug: producto.slug,
        referencia: producto.referencia,
        descripcion: producto.descripcion,
        precio: producto.precio,
        precioAntiguo: producto.precioAntiguo,
        descuento: producto.descuento,
        mensaje: producto.mensaje,
        imagen: producto.imagen,
        imagenesSecundarias: producto.imagenesSecundarias ?? [],
        stock: producto.stock,
        variantes: producto.variantes,
        color: producto.color,
        categoria: producto.categoria,
        tiempoEnvioDias: producto.tiempoEnvioDias,
        ubicacion: producto.ubicacion,
        limiteStockVisible: producto.limiteStockVisible,
      },
    })
  }

  console.log('✅ Seed completado')
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
