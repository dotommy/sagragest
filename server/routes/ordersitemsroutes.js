import express from 'express';
import { resetAutoIncrementOrderItems, createOrderItem, readOrderItem, readOrderItembyId, deleteOrderItem } from '../controllers/orderitemscontrollers.js';
import { verifyToken } from '../controllers/authcontrollers.js';

const orderitemsrouter = express.Router();

const verifyTokenMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token is missing!' });
    }

    if (await verifyToken(token)) {
        next();
    } else {
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
};

orderitemsrouter.post("/reset", verifyTokenMiddleware, (req, res) => {
    resetAutoIncrementOrderItems()
        .then(() => res.json({ success: true }))
        .catch(error => res.status(400).json({ error: error.message }));
});

orderitemsrouter.post("/create", verifyTokenMiddleware, (req, res) => {
    const { orderId, productId, quantity } = req.body;

    if (!orderId || !productId || !quantity || isNaN(orderId) || isNaN(productId) || isNaN(quantity)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    createOrderItem(Number(orderId), Number(productId), Number(quantity))
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ error: error.message }));
});

export default orderitemsrouter;



