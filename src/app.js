import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './util.js';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import path from 'node:path'
import productsRouter from './routes/products.router.js'
import ProductManager from './managers/ProductManager.js';


const productsPath = path.join(__dirname, './files/products.json')
const productManager = new ProductManager(productsPath)

const app = express();

//configurar motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//archivos estaticos
app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', viewsRouter)

const server = app.listen(8080, () => console.log('Listening on port 8080'));


//socket io configuration
const socketServer = new Server(server);

socketServer.on('connection', socket =>{
    console.log('new client connected');

    socket.on('addProduct', async (data) =>{
        console.log(data);
        try {
         await productManager.addPorduct(data);
         socketServer.emit('showProducts', await productManager.getProducts());
        } catch (error) {
         console.error(error);
        } 
     });
 
     socket.on('removeProduct', async (data) =>{
         try {
             const idRemove = parseInt(data);
             await productManager.deleteProduct(idRemove);
             socketServer.emit('showProducts', await productManager.getProducts());
         } catch (error) {
             console.error(error);
         }
     });

});

