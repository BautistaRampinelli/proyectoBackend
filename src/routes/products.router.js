import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname+'/api/products.json');

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(+id);
        res.json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const obj = req.body;
        const newProduct = await productManager.addProduct(obj);
        res.json({ message: 'Product created', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const message = await productManager.deleteProducts();
        res.json({ message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const message = await productManager.deleteProductById(+id);
        res.json({ message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const product = await productManager.updateProduct(+id, obj);
        res.json({ message: 'Product updated', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;