import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@erick.com'
  const plainPassword = 'Admin123+'
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Administrador',
      password: hashedPassword,
      role: 'admin',
      verificado: true
    }
  })

  console.log('✅ Usuario admin creado o existente:', admin)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())