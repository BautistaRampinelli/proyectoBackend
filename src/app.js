import express from "express";
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io";
import './db/dbConfig.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars',handlebars.engine());

app.set('views',__dirname+'/views');
app.set('view engine',handlebars);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views',viewsRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor.');
});

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}.`);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnet',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })

    socket.emit('bienvenida',`Bienvenido a WEBSOCKET cliente con id: ${socket.id}`)
})
