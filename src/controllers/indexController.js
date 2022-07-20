const express = require ('express');

const indexController = {

    vistaIndex: (req,res) =>{
        res.render('index');  
    },
}

module.exports = indexController;

