let path = require('path');
let fs = require('fs');

let productsFilePath = path.join (__dirname, '../data/productsDataBase.json');

let products = JSON.parse ( fs.fileReadSync (productsFilePath, 'utf-8') );

const controlador = {
    createProduct: (req, res) => {
        res.render ('./admin/createProduct');
    },
    modifyProduct: (req, res) => {
        res.render ('./admin/modifyProduct');
    }


}

module.exports = controlador;