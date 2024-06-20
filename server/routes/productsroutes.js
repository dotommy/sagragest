import express from 'express';
import { createProduct, readProduct, updateCategoryID, updateName, updatePrice, deleteProduct, readProductbyId } from '../controllers/productscontrollers.js';
import { verifyToken } from '../controllers/authcontrollers.js';

const productsrouter = express.Router();

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

productsrouter.post("/create", verifyTokenMiddleware, (req, res) => {
    const { name, categoryId, price } = req.body;

    if (!name || !categoryId || !price || isNaN(categoryId) || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    createProduct(name, Number(categoryId), Number(price))
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

productsrouter.get("/read", verifyTokenMiddleware, (req, res) => {
    readProduct()
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

productsrouter.post("/readbyid", verifyTokenMiddleware, (req, res) => {
    const { id } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    readProductbyId(Number(id))
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

productsrouter.put("/updatecategoryid", verifyTokenMiddleware, (req, res) => {
    const { id, categoryId } = req.body;

    if (!id || !categoryId || isNaN(id) || isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    updateCategoryID(Number(id), Number(categoryId))
        .then(data => { res.json(data); })
        .catch(error => { res.status(400).json({ error: error.message }); });
});

productsrouter.put("/updatename", verifyTokenMiddleware, (req, res) => {
    const { id, name } = req.body;

    if (!id || isNaN(id) || !name) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    updateName(id, name)
        .then(data => { res.json(data); })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});

productsrouter.put("/updateprice", verifyTokenMiddleware, (req, res) => {
    const { id, price } = req.body;

    if (!id || isNaN(id) || !price || isNaN(price)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    updatePrice(id, Number(price))
        .then(data => { res.json(data); })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
});


productsrouter.delete("/delete/:id", verifyTokenMiddleware, (req, res) => {
    const id = parseInt(req.params.id);

    if (!isNaN(id)) {
        deleteProduct(id)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(400).json({ error: error.message });
            });
    } else {
        res.status(400).json({ error: 'ID must be a number' });
    }
});


export default productsrouter;
