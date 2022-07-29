const path=require('path');
const fs= require('fs');

let productsPath= path.join(__dirname, '../data/productsDataBase.json');
const products= JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const express = require ('express');

const indexController = {

    vistaIndex: (req,res) =>{
        res.render('index');  
    },
}

module.exports = indexController;

