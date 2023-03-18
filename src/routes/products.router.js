import { Router } from "express";
import ProductManager from "../ProductManager";
import { __dirname } from "../utils";

const router = Router();
const productManager = new ProductManager(__dirname+'/api/products.json');

router.get('/', async(req, res) => {
    const products = await productManager.getProducts();
    res.json({products})
})

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const product = await productManager.getProductById(+id);
    res.json({product});
})

router.post('/', async(req, res) => {
    const obj = req.body;
    const newProduct = await productManager.addProduct();
    res.json({message: 'Product created', product: newProduct});
})

router.delete('/', async(req, res) => {
    const message = await productManager.deleteProducts();
    res.json({message});
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const message = await productManager.deleteProductById(+id);
    res.json({message});
})

router.put('/:id', async(req,res) => {
    const {id} = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(+id, obj);

})

export default router;