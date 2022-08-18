const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const Product = require ('../models/Product');
const Category = require ('../models/Category');


const categories = Category.findAll();

const controller = {

    deleteFromShoppingCart: (req, res) => {
        let shoppingCart = req.session.shoppingCart.filter (product => {
            return product.id != req.params.id;
        });
    
        req.session.shoppingCart = shoppingCart;

        return res.redirect ('/products/shoppingCart');
    }, 

    addToShoppingCart: (req, res) => {
        /* Crea el array shoppingCart si no existe. Agregar el nuevo producto comprado */
        !req.session.shoppingCart? req.session.shoppingCart = []: null;

        let addToCart = Product.findById (req.params.id);

        req.session.shoppingCart.push (addToCart);

        return res.redirect ('/products/shoppingCart');
    },

    shoppingCart: (req, res) => {
        if (!req.session.shoppingCart || req.session.shoppingCart.length == 0) {
            return res.render ('./products/shoppingCart', {categories});
        }
        
        let shoppingCart = req.session.shoppingCart;

        let subtotal = 0;

        shoppingCart.forEach ((product, index) => {
            subtotal = subtotal + (product.price * (1 - product.discount / 100));
        });

        return res.render ('./products/shoppingCart', {categories, shoppingCart, toThousand, subtotal});
    },

    productDetail: (req, res) => {

        let product = Product.findById(req.params.id);
        
        return res.render ('./products/productDetail', {product, toThousand, categories});

    },

    productsList: (req, res) => {
        if (req.query.category) {
            let categoryId = req.query.category;
            
            let products = Product.filterByCategory (categoryId);
            
            return res.render('products/productsList', {categoryId, products, categories});
        } else {
            let products = Product.findAll(); 
            
            return res.render('products/productsList', {products, categories});
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

        return res.render('products/productsList', {products: productosFiltrados, categories});
    },

    search: function(req,res){
        const notFound= "No hay productos que coincidan con su búsqueda"
        const product= Product.findAll();
        const keyWords= req.body.keyWords.toLowerCase();
       

        const products= product.filter(valor=>{
            return valor.name.toLowerCase().includes(keyWords)
        });
        

        res.render('products/productsList', {products, categories, notFound, word:req.body.keyWords});
    },

    agregarAlCarrito: (req, res) => {
        !locals.shoppingCart? res.locals.shoppingCart = []: null;

        let productBought = products.find (product => {
            return product.id == req.params.id;
        });

        shoppingCart.push (productBought);

        let subtotal = shoppingCart.reduce (sum, )

        res.redirect ('products/shoppingCart', { shoppingCart, categories, toThousand });

     res.render('products/productsList', {products, categories});
    
       res.render('products/productsList', {products, categories, notFound});
    },



}


module.exports = controller;