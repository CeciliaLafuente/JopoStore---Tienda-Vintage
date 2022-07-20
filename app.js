const express = require('express');
const path = require('path');

let app = express();

const publicPath= path.join(__dirname,'./public');
app.use (express.static(publicPath));

// const mainRouter = require ('./src/routers/main.js');
const productsRouter = require ('./src/routers/products.js');
const usersRouter = require ('./src/routers/users.js');
const adminRouter = require ('./src/routers/admin.js');


//app.use ('/', mainRouter);
app.use ('/products', productsRouter);
app.use ('/users', usersRouter);
app.use ('/admin', adminRouter);

app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, './src/views'));



app.listen(process.env.PORT || 3040, ()=>{
    console.log("Servidor corriendo en el puerto 3040");
})


app.get('/', function(req,res){
    res.render('index');
})






