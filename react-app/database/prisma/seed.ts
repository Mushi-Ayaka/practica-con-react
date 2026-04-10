import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

// 1. Configuración del Adaptador (Igual que en el servidor)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando la siembra de datos...');

    // Leer el archivo users.json (buscándolo relativo a este script)
    const usersPath = path.join(import.meta.dirname, '..', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    // Limpiar la tabla antes de sembrar (Opcional, pero recomendado en desarrollo)
    // await prisma.user.deleteMany();

    // Inyectar los datos
    for (const user of usersData) {
        await prisma.user.upsert({
            where: { userName: user.userName },
            update: {}, // No sobreescribir datos existentes (mantiene el initialIsFollowing)
            create: {
                userName: user.userName,
                name: user.name,
                initialIsFollowing: user.initialIsFollowing,
            }
        });
    }

    console.log('✅ ¡Siembra completada con éxito!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
