import { Router } from "express";
import ProductManager from "../ProductManager";
import { __dirname } from "../utils";

const router = Router();
const productManager = new ProductManager(__dirname+'/api/products.json');

app.get('/', async(req, res) => {
    const products = await productManager.getProducts();
    res.json({products})
})

app.get('/:id', async(req, res) => {
    const {id} = req.params;
    const product = await productManager.getProductById(+id);
    res.json({product});
})

app.post('/', async(req, res) => {
    const obj = req.body;
    const newProduct = await productManager.addProduct();
    res.json({message: 'Product created', product: 'newProduct'});
})

app.delete('/', async(req, res) => {
    const message = await productManager.deleteProducts();
    res.json({message});
})

app.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const message = await productManager.deleteProductById(+id);
    res.json({message});
})

app.put('/:id', async(req,res) => {
    const {id} = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(+id, obj);

})

export default router;