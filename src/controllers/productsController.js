const fs= require('fs');
const path= require ('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

    shoppingCart: (req, res) => {
        res.render ('shoppingCart');
    },

    productDetail: (req, res) => {
    let idProduct = req.params.id;
    res.render ('productDetail', {product:products[idProduct]});
    },

    productsList: (req, res) => {
        res.render('productsList', {products: products});
    },

    // productsList: (req, res) => {
    // let product= products.filter(valor=>{
    // return valor.id== req.params.id;
    //  });
    }


module.exports = controller;