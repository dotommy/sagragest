import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

import categoriesrouter from './routes/categoriesroutes.js';
import productsrouter from './routes/productsroutes.js';
import ordersrouter from './routes/ordersroutes.js';
import orderitemsrouter from './routes/ordersitemsroutes.js';
import authrouter from './routes/authroutes.js';
import { createDefaultAdminUser } from './controllers/authcontrollers.js';
import { InitializeCategories } from './controllers/categoriescontrollers.js';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/categories', categoriesrouter);
app.use('/products', productsrouter);
app.use('/orders', ordersrouter);
app.use('/orderitems', orderitemsrouter);
app.use('/auth', authrouter)

app.listen(PORT, async () => {
    console.log(`Il server è in esecuzione sulla porta ${PORT}`);
    await createDefaultAdminUser()
    await InitializeCategories()
});