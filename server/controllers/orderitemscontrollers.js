import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Reset AutoIncrement
export async function resetAutoIncrementOrderItems() {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'OrderItems'`;
  }

// Creazione dei prodotti nell'Ordine
export async function createOrderItem(OrderId, productId, quantity,) {
    
    try{
        if(isNaN(OrderId)) {
            throw new Error('OrderId must be a number');
        }
        else if (isNaN(productId)) {
            throw new Error('ProductId must be a number');
        }
        else if(isNaN(quantity)) {
            throw new Error('Quantity must be a number');
        }
        else {
            const newOrderItem = await prisma.orderItems.create({
                data:{
                    orderId: Number(OrderId),
                    productId: Number(productId),
                    quantity: Number(quantity)
                },
                include: {
                    Orders: true,
                    Products: true
                  }
            })
            return newOrderItem
        }
    } catch (error) {
        return error;
    }
}

//Legge i prodotti dell'Ordine

export async function readOrderItem() {
    try {
        const readOrder = await prisma.orderItems.findMany({
            include: {
                Orders: true,
                Products: true
              }            
        })
        return readOrder
    } catch (error) {
        return error;
    }
}

//Legge i prodotti dell'Ordine per ID
export async function readOrderItembyId(id) {
    try {
        if(!isNaN(id)) {
            const readOrder = await prisma.orderItems.findMany({
                where: {
                    id: {
                        equals: parseInt(id),
                    }
                },
                include: {
                    Orders: true,
                    Products: true
                  }            
            })
            return readOrder
        }
        else {
            throw new Error('id must be a number')
        }
    } catch (error) {
        return error;
    }
}

//Cancella tutti gli oridini

export async function deleteAllOrderItems() {
    try {
        const deleteAll = await prisma.orderItems.deleteMany({});
        resetAutoIncrementOrderItems()
        return deleteAll;
    } catch (error) {
        throw new Error('Error deleting all OrderItems: ' + error.message);
    }
}

//Cancella tutti gli ordini per ID
export async function deleteOrderItem(id) {
    try {
        if (!isNaN(id)) {
            const deleteOrder = await prisma.orderItems.delete({
                where: { 
                    id: Number(id) 
                },
                include: {
                    Orders: true,
                    Products: true
                  }
            })
            return deleteOrder
        }
        else {throw new Error('id must be a number')}
    } catch (error) {
        return error;
    }
}
