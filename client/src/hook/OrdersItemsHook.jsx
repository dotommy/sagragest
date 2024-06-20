import axios from 'axios';

// Cancellazione tabelle OrderItems (non implementato)
export async function resetOrderItems() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/orderitems/reset', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error resetting order items");
    }
}

// Inserisce Prodotti nell'Ordine
export async function createOrderItems(orderid, productid, quantity) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/orderitems/create', { orderId: orderid, productId: productid, quantity: quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error creating order items");
    }
}
