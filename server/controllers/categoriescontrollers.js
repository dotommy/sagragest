import { PrismaClient } from '@prisma/client';
import { findFirstAvailableId } from '../utils/helpers.js';
const prisma = new PrismaClient();

//Crea categoria
export async function createCategory(name) {
    try {
        if(typeof name === 'string'){
            const newCategoryId = await findFirstAvailableId('Categories');
            const newCategory = await prisma.categories.create({
            data: {
                id: newCategoryId,
                name: name
            },
          });
          return newCategory
        }
        else {
            throw new Error('name must be a string')
        }
    } catch (error) {
        return error;
    }
  }

  //Legge tutte le categorie
  export async function readCategories() {
    try {
        const readCategories = await prisma.categories.findMany({
            include: {
                Products: true
            }
        })
        return readCategories
    } catch (error) {
        console.error("Error read category:", error);
        throw error;
    }
  }