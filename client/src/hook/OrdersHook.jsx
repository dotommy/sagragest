import axios from 'axios';

// Cancellazione tabelle Orders (non implementato)
export async function resetOrders() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/orders/reset', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error resetting orders");
    }
}

//Creazione Ordine
export async function createOrder(customername, ordertotal) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/orders/create', { 
            customerName: customername, 
            orderTotal: ordertotal },
            {headers: {
                Authorization: `Bearer ${token}`
            }}
        );
        return response.data;
    } catch (error) {
        throw new Error("Error creating order");
    }
}

//Lettura Ordine
export async function readOrder() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/orders/read', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error reading orders");
    }
}

//Lettura Ordine per ID
export async function readOrderbyId(id) {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.post('http://localhost:3000/orders/readbyid',{ id: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error reading orders");
    }
}


