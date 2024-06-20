import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//Reset AutoIncrement
export async function resetOrdersAutoIncrementOrders() {
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Orders'`;
  }

//Creazione Ordine
export async function createOrder(CustomerName, Ordertotal) {
    
    try{
        if(typeof CustomerName !== 'string') {
            throw new Error('customer name must be a string');
        }
        else if (isNaN(Ordertotal)) {
            throw new Error('total order name must be a number');
        }
        else {
            const newOrder = await prisma.orders.create({
                data:{
                    customerName: CustomerName,
                    orderDate: new Date(),
                    ordertotal: Number(Ordertotal)
                }
            })
            return newOrder
        }
    } catch (error) {
        return error;
    }
}

//Lettura Ordini

export async function readOrder() {
    try {
        const readOrder = await prisma.orders.findMany({
            include: {
                OrderItems: true
              }            
        })
        return readOrder
    } catch (error) {
        return error;
    }
}

//Lettura Ordini per ID

export async function readOrdersbyID(id) {  
    try {
        if (!isNaN(id)) {
            const readOrderbyid = await prisma.orders.findMany({
                where: {
                    id: {
                        equals: parseInt(id),
                    }
                },
                include: {
                    OrderItems: true
                  }  
            })
            return readOrderbyid
        }
        else { throw new Error('id must be a number')}
    } catch (error) {
        return error;
    }
}

//Modifica Nome del Costumer

export async function updateCostumerName(id, newname) {
    try{
        if (!isNaN(id)) {
            await prisma.orders.update({
                where: { id: Number(id) },
                data: { customerName: newname }
            })
            return {response: true, costumerName: newname}
        } 
        else {throw new Error('id must be a number')}
    } catch (error) {
        return error
    }
}

//Cancella tutti gli ordini

export async function deleteAllOrders() {
    try {
        const deleteAll = await prisma.orders.deleteMany({});
        resetOrdersAutoIncrementOrders()
        return deleteAll;
    } catch (error) {
        throw new Error('Error deleting all orders: ' + error.message);
    }
}

//Cancella Ordini per ID

export async function deleteOrder(id) {
    try {
        if (!isNaN(id)) {
            const deleteOrder = await prisma.orders.delete({
                where: { id: Number(id) }
            })
            return deleteOrder
        }
        else {throw new Error('id must be a number')}
    } catch (error) {
        return error;
    }
}
