import { Router } from "express";
import { ManagerCart } from "../managerCart.js";
import { __dirname } from "../utils.js";

const router = Router();
const managerCart = new ManagerCart(__dirname+'/api/Carts.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await managerCart.createCart();
        res.json({ cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating cart" });
    }
});

router.get('/:idCart', async (req, res) => {
    try {
        const idCart = parseInt(req.params.idCart);
        const cart = await managerCart.getCart(idCart);
        res.json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting cart" });
    }
});

router.post('/:idCart/product/', async (req, res) => {
    try {
        const idCart = parseInt(req.params.idCart);
        const idProduct = parseInt(req.params.idProduct);
        const addProduct = await managerCart.addProductToCart(idCart, idProduct);
        res.json({ message: addProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product to cart" });
    }
});

export default router;
