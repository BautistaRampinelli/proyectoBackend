import express from "express";
import ProductManager from "./ProductManager";
import cartsRouter from './routes/carts.router';
import productsRouter from './routes/products.router';
import { __dirname } from "./utils";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/public',express.static(__dirname));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);




app.listen(8080, () => {
    console.log('Escuchando al puerto 8080.');
})