const express = require('express');
const path = require('path');

let app = express();

const publicPath= path.join(__dirname,'./public');
app.use (express.static(publicPath));

// const mainRouter = require ('./src/routers/main.js');
const productsRouter = require ('./src/routers/products.js');
// const usersRouter = require ('./src/routers/users.js');


// app.use ('/', mainRouter);
app.use ('/products', productsRouter);
// app.use ('/users', usersRouter);

app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, './src/views'));



app.listen(process.env.PORT || 3040, ()=>{
    console.log("Servidor corriendo en el puerto 3040");
})


let home= path.join(__dirname,'./src/views/index.html');
let login= path.join(__dirname,'./src/views/users/login.html');
let registro= path.join(__dirname,'./src/views/users/register.html');
// let carrito= path.join(__dirname,'./src/views/products/carrito.html');
// let detalleProd= path.join(__dirname,'./src/views/products/detalleProducto.ejs');




app.get('/', function(req,res){
    res.render('index');
})

app.get('/registro', function(req,res){
    res.sendFile(registro);
})

app.get('/login', function(req,res){
    res.sendFile(login);
})

// app.get('/carrito-de-compras', function(req,res){
//     res.sendFile (carrito);
// })

// app.get('/detalle-del-producto', function(req,res){
//     res.render (detalleProd);
// })





