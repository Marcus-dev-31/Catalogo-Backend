import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash('tu-password-segura', 10)

    await prisma.user.create({
        data: {
            email: 'admin@multitienda.com',
            password: hashedPassword
        }
    })

    console.log('Admin Creado')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
