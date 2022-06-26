const express=require('express');
const path=require('path');
let app=express();


const publicPath= path.resolve(__dirname,'./public');
app.use(express.static(publicPath));

app.listen(3040, ()=>{
    console.log("Servidor corriendo en el puerto 3040");
})

let home= path.join(__dirname,'./views/home.html');
let header= path.join(__dirname,'./views/header.html');
let footer= path.join(__dirname,'./views/footer.html');
let login= path.join(__dirname,'./views/login.html');
let registro= path.join(__dirname,'./views/registro.html');

app.get('/', function(req,res){
    res.sendFile(home);
})