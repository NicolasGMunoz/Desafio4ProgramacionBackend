import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'
import { __dirname } from "../util.js";
import path from 'node:path';

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);
const router = Router();

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
        products
    });
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {
            products
        });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

export default router;