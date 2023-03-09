import express from "express";
import ProductManager from "./ProductManager";

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', async(req, res) => {
    const products = await productManager.getProducts();
    res.json({products})
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await productManager.getProductById(+id);
    res.json({product});
})

app.post('/products', async(req, res) => {
    const obj = req.body;
    const newProduct = await productManager.addProduct();
    res.json({message: 'Product created', product: 'newProduct'});
})

app.delete('/products', async(req, res) => {
    const message = await productManager.deleteProducts();
    res.json({message});
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params;
    const message = await productManager.deleteProductById(+id);
    res.json({message});
})

app.put('/products/:id', async(req,res) => {
    const {id} = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(+id, obj);

})

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080.');
})