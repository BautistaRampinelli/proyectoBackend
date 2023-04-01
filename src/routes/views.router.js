import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager(__dirname + '/api/products.json');

router.get('/home', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default router;
