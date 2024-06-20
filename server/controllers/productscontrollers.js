import { PrismaClient } from '@prisma/client';
import { findFirstAvailableId } from '../utils/helpers.js';
const prisma = new PrismaClient();

//Creazione Prodotto
export async function createProduct(name, categoryId, price) {
    try {
        if (typeof name !== 'string') {
            throw new Error('name must be a string');
        }

        // Controlla che categoryId sia un numero intero
        if (!Number.isInteger(categoryId)) {
            throw new Error('categoryId must be an integer');
        }

        // Controlla che price sia un numero intero o float
        if (typeof price !== 'number' || isNaN(price)) {
            throw new Error('price must be a number');
        }
        const newCategoryId = await findFirstAvailableId('Products');
        const newProduct = await prisma.products.create({
            data: {
                id: newCategoryId,
                name: name,
                category_id: categoryId,
                price: price
            }
        });

        // Aggiungi il nuovo prodotto all'array di Prodotti nel modello Categories
        await prisma.categories.update({
            where: { id: categoryId },
            data: {
                Products: {
                    connect: { id: newProduct.id }
                }
            }
        });

        return newProduct;
    } catch (error) {
        return error
    }
}

//Lettura di tutti i Prodotti
export async function readProduct() {
    try {
        const readProduct = await prisma.products.findMany({})
        return readProduct
    } catch (error) {
        return error
    }
}

//Lettura prodotti per ID
export async function readProductbyId(id) {
    try {
        if(!isNaN(id)){
            const readProductbyid = await prisma.products.findMany({
                where: {
                    id: {
                        equals: parseInt(id),
                    }
                }
            })
            return readProductbyid
        }
        else {
            throw new Error('name must be a number')
        }
    } catch (error) {
        return error
    }
}

//Lettura prodotti per nome (non implementato)
export async function readProductbyname(name) {
    try {
        if(typeof name === 'string'){
            const readProductbyname = await prisma.products.findMany({
                where: {
                    name: {
                        contains: name,
                    }
                }
            })
            return readProductbyname
        }
        else {
            throw new Error('name must be a string')
        }
    } catch (error) {
        return error
    }
}

//Modifica CategoryID

export async function updateCategoryID(id, newcategoryid) {
    try{
        if(!isNaN(id && newcategoryid)) {
            await prisma.products.update({
                where: { id: id },
                data: { category_id: newcategoryid }
            })
            return true
        }
        else {
            throw new Error("id and new id must be a number")
        }
    } catch (error) {
        return error
    }
}

//Modifica Nome

export async function updateName(id, newname) {
    try{
        if(!isNaN(id) && typeof newname === 'string')
        {await prisma.products.update({
            where: { id: id },
            data: { name: newname }
        })
        return true}
        else {
            throw new Error('id must be a number and name must be a string')
        }
    } catch (error) {
        return error
    }
}

//Modifica Prezzo
export async function updatePrice(id, newprice) {
    try{
        if(!isNaN(id && newprice))
        {await prisma.products.update({
            where: { id: id },
            data: { price: newprice }
        })
        return true}
        else {
            throw new Error('the id and the new price must be numbers')
        }
    } catch (error) {
        return error
    }
}

//Cancella Prodotto per id

export async function deleteProduct(id) {
    try {
        if(!isNaN(id))
        {const deleteProduct = await prisma.products.delete({
            where: { id: Number(id) }
        })
        return deleteProduct}
        else {
            throw new Error('The id must be a number')
        }
    } catch (error) {
        return error
    }
}