import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function findFirstAvailableId(model) {
    if (!model) {
        throw new Error('Model is required');
    }

    const categories = await prisma[model].findMany({
        select: { id: true },
        orderBy: { id: 'asc' },
    });

    let firstAvailableId = 1;
    for (const category of categories) {
        if (category.id !== firstAvailableId) {
            break;
        }
        firstAvailableId++;
    }

    return firstAvailableId;
}