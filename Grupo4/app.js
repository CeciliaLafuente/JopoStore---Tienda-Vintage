const express=require('express');
const path=require('path');
let app=express();


const publicPath= path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(3040, ()=>{
    console.log("Servidor corriendo en el puerto 3040");
})

let home= path.join(__dirname,'./views/index.html');
let login= path.join(__dirname,'./views/login.html');
let registro= path.join(__dirname,'./views/register.html');
let carrito= path.join(__dirname,'./views/carrito.html');
let detalleProd= path.join(__dirname,'./views/productDetail.html');



app.get('/', function(req,res){
    res.sendFile(home);
})

app.get('/registro', function(req,res){
    res.sendFile(registro);
})

app.get('/login', function(req,res){
    res.sendFile(login);
})

app.get('/carrito-de-compras', function(req,res){
    res.sendFile(carrito);
})

app.get('/detalle-del-producto', function(req,res){
    res.sendFile(detalleProd);
})



