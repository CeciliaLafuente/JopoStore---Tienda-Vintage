const express=require('express');
const path=require('path');
let app=express();

app.use(express.static("public"));

app.listen(3040, ()=>{
    console.log("Servidor corriendo en el puerto 3040");
})

let home= path.join(__dirname,'./views/home.html');

app.get('/', function(req,res){
    res.sendFile(home);
})