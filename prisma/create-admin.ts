import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en el .env')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  console.log(`Admin creado: ${email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())