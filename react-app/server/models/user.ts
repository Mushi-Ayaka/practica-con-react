import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL_POOLING;
console.log('Intentando conectar a la DB (Pooling-Mode)...');

const pool = new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('Error crítico en el pool de Postgres:', err);
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class Users {
    async getAll() {
        console.log('Solicitando usuarios a Prisma...');
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            console.log(`${users.length} usuarios recuperados.`);
            return users;
        } catch (error) {
            console.error('Error en prisma.user.findMany():', error);
            throw error;
        }
    }

    async updateFollowStatus(id: string, status: boolean) {
        console.log(`Petición para actualizar follow - ID: ${id}, Nuevo Status: ${status}`);
        try {
            const user = await prisma.user.update({
                where: { id },
                data: { initialIsFollowing: status },
            });
            console.log(`Usuario ${id} actualizado en DB. Nuevo estado: ${user.initialIsFollowing}`);
            return user;
        } catch (error) {
            console.error('Error al actualizar el estado de seguimiento en Prisma:', error);
            throw error;
        }
    }
};

export const usersModel = new Users();
