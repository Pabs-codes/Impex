import {PrismaClient} from '@prisma/client';

const prismaClient = new PrismaClient();

const getPrismaClient = () => {
    return prismaClient || new PrismaClient();
}

export const prisma = getPrismaClient();