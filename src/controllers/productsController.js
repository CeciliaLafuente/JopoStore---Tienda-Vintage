
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
    let idProduct = req.params.id;
    res.render ('./products/productDetail', {product:products[idProduct]});
    },

    productsList: (req, res) => {
        res.render ('./products/productsList', {products:products});
    }


}

module.exports = controlador;