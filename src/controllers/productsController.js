const fs= require('fs');
const path= require ('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Product = require ('../models/Product');
const Category = require ('../models/Category');
const { localsName } = require('ejs');

const categories = Category.findAll();


const controller = {

    shoppingCart: (req, res) => {
        res.render ('products/shoppingCart', {categories});
    },

    productDetail: (req, res) => {
        let product = Product.findById(req.params.id);
        
        res.render ('./products/productDetail', {product, toThousand, categories});
    },

    productsList: (req, res) => {
        if (req.query.category) {
            let categoryId = req.query.category;
            
            let products = Product.filterByCategory (categoryId);
            
            res.render('products/productsList', {categoryId, products, categories});
        } else {
            let products = Product.findAll(); 
            
            res.render('products/productsList', {products, categories});
        }

    },

    filtroPorCategoria:(req, res) => {
        let products = Product.findAll();
        
        if (req.body.category ==''){
            return  res.render('products/productsList', {products, categories});
    }

        const productosFiltrados = products.filter((producto)=>{
            return producto.category == req.body.category;
        })

        res.render('products/productsList', {products: productosFiltrados, categories});
    },

    agregarAlCarrito: (req, res) => {
        !locals.shoppingCart? res.locals.shoppingCart = []: null;

        let productBought = products.find (product => {
            return product.id == req.params.id;
        });

        shoppingCart.push (productBought);

        let subtotal = shoppingCart.reduce (sum, )

        res.redirect ('products/shoppingCart', { shoppingCart, categories, toThousand });

    }

}


module.exports = controller;