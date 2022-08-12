const fs= require('fs');
const path= require ('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Product = require ('../models/Product');


const controller = {

    shoppingCart: (req, res) => {
        res.render ('products/shoppingCart');
    },

    productDetail: (req, res) => {
        // let product = products.find(valor => {
        //     return valor.id == req.params.id;
        // });
        let product = Product.findById(req.params.id);
        
        res.render ('./products/productDetail', {product, toThousand});
    },

    productsList: (req, res) => {
        if (req.query.category) {
            let categoryLabel = req.query.category;
            
            let products = Product.filterByCategory (categoryLabel);
            
            res.render('products/productsList', {categoryLabel, products});
        } else {
            let products = Product.findAll(); 
            
            res.render('products/productsList', {products});
        }

    },

    filtroPorCategoria:(req, res) => {
        if (req.body.category =='Todas'){
            return  res.render('products/productsList', {products: products});
    }

        const productosFiltrados = products.filter((producto)=>{
            return producto.category == req.body.category;
        })

        res.render('products/productsList', {products: productosFiltrados});
    },

}


module.exports = controller;