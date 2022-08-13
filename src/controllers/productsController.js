
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Product = require ('../models/Product');
const Category = require ('../models/Category');

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
        if (req.body.category =='Todas'){
            return  res.render('products/productsList', {products, categories});
    }

        const productosFiltrados = products.filter((producto)=>{
            return producto.category == req.body.category;
        })

        res.render('products/productsList', {products: productosFiltrados, categories});
    },

    search: function(req,res){
        const product= Product.findAll();
        const keyWords= req.body.keyWords.toLowerCase();

        const products= product.filter(valor=>{
            return valor.name.toLowerCase().includes(keyWords)
        });
        
       
        res.render('products/productsList', {products, categories});
    }

}


module.exports = controller;