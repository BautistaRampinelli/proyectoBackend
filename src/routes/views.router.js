import { Router } from "express";
import { __dirname } from "../utils.js";

const router = Router();

router.get('/home',(req,res)=>{
    res.render('home',{products});
})

router.get('/realTimeProducts',(req,res)=>{
    res.render('realTimeProducts',{products})
})

export default router;