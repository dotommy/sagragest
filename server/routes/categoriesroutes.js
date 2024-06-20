import express from 'express';
import { readCategories } from '../controllers/categoriescontrollers.js';
import { verifyToken } from '../controllers/authcontrollers.js';

var categoriesrouter = express.Router();

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

categoriesrouter.get("/read", verifyTokenMiddleware, (req, res) => {
    readCategories()
        .then(data => {res.json(data)})
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

export default categoriesrouter;