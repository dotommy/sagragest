import express from 'express';
import jwt from 'jsonwebtoken';
import { register, login, verifyToken, isAdmin, getUsers, changePassword } from '../controllers/authcontrollers.js';

const authrouter = express.Router();

//Verifica JWT token

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

//Verifica se isAdmin è true

export const adminOnlyMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is missing!' });
    }

    try {
        const decoded = jwt.decode(token, process.env.SECRET_KEY);
        if (await isAdmin(decoded.userId)) {
            next();
        } else {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
};

//Registra un nuovo user

authrouter.post("/register", verifyTokenMiddleware, adminOnlyMiddleware, (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    register(username, password)
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); 
        console.log(error)});
});
authrouter.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    login(username, password)
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

//Cambio Password

authrouter.post("/changepassword", verifyTokenMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Old password and new password are required" });
    }

    try {
        const decoded = jwt.decode(token, process.env.SECRET_KEY);
        const updatedUser = await changePassword(decoded.userId, oldPassword, newPassword);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
authrouter.get("/getusers", verifyTokenMiddleware, adminOnlyMiddleware, (req, res) => {
    getUsers()
        .then(users => { res.json(users); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

//Verifica Token x reset in localstorage

authrouter.get("/verifytoken", (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    verifyToken(token)
        .then(isValid => { res.json({ valid: isValid }); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

export default authrouter;
