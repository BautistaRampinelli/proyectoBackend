import { Router } from "express";
import { ManagerCart } from "../managerCart";
import { __dirname } from "../utils";

const router = Router();
const managerCart = new ManagerCart(__dirname+'/api/Carts.json');

router.post('/', async(req,res)=>{
    const newCart = await managerCart.createCart();
    res.json({cart:newCart});
})

router.get('/:idCart',async(req,res)=>{
    const {idCart} = req.params;
    const cart = await managerCart.getCart(+idCart);
    res.json({cart})
})

router.post('/:idCart/product/',async(req,res)=>{
    const {idCart, idProduct} = req.params;
    const addProduct = await managerCart.addProductToCart(+idCart,+idProduct);
    res.json({message:addProduct});
})

export default router;