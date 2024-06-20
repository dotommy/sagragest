import express from 'express';
import { resetOrdersAutoIncrementOrders, createOrder, readOrder, readOrdersbyID, deleteOrder, updateCostumerName } from '../controllers/orderscontrollers.js';
import { verifyToken } from '../controllers/authcontrollers.js';

const ordersrouter = express.Router();

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

ordersrouter.post("/reset", verifyTokenMiddleware, (req, res) => {
    resetOrdersAutoIncrementOrders()
        .then(() => res.json({ success: true }))
        .catch(error => res.status(400).json({ error: error.message }));
});

ordersrouter.post("/create", verifyTokenMiddleware, (req, res) => {
    const { customerName, orderTotal } = req.body;

    if (!customerName || isNaN(orderTotal)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    createOrder(customerName, Number(orderTotal))
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ error: error.message }));
});

ordersrouter.get("/read", verifyTokenMiddleware, (req, res) => {
    readOrder()
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ error: error.message }));
});

ordersrouter.post("/readbyid", verifyTokenMiddleware, (req, res) => {
    const { id } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    readOrdersbyID(Number(id))
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ error: error.message }));
});

export default ordersrouter;
