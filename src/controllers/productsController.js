const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// const Product = require('../models/Product');
// const Category = require('../models/Category');
// const categories = Category.findAll();

const controller = {

    deleteFromShoppingCart: (req, res) => {
        let shoppingCart = req.session.shoppingCart.filter(product => {
            return product.id != req.params.id;
        });

        req.session.shoppingCart = shoppingCart;

        return res.redirect('/products/shoppingCart');
    },

    addToShoppingCart: async (req, res) => {
        /* Crea el array shoppingCart si no existe. Agregar el nuevo producto comprado */
        !req.session.shoppingCart ? req.session.shoppingCart = [] : null;

        let addToCart = await db.Products.findByPk(req.params.id);

        req.session.shoppingCart.push(addToCart);

        return res.redirect('/products/shoppingCart');
    },

    shoppingCart: async (req, res) => {
        let categories = await db.Product_Categories.findAll();
        if (!req.session.shoppingCart || req.session.shoppingCart.length == 0) {
            return res.render('./products/shoppingCart', { categories });
        }

        let shoppingCart = req.session.shoppingCart;

        let subtotal = 0;

        shoppingCart.forEach((product, index) => {
            subtotal = subtotal + (product.price * (1 - product.discount / 100));
        });
        let products = await db.Products.findAll();

        return res.render('./products/shoppingCart', { categories, shoppingCart, toThousand, subtotal });
    },

    productDetail: (req, res) => {
        Promise.all([
            db.Product_Categories.findAll(),
            db.Products.findByPk(req.params.id)
        ])
            .then(function ([categorias, product]) {

                return res.render('./products/productDetail', { product, categories: categorias, toThousand });
            })

    },

    productsList: (req, res) => {
        let productsFilter = {}
        if (req.query.category) {
            let categoryId = req.query.category;
            productsFilter = {
                where: {
                    category_id: categoryId
                }
            }
        }
        Promise.all([
            db.Product_Categories.findAll(),
            db.Products.findAll(productsFilter)
        ])
            .then(function ([categorias, products]) {

                return res.render('products/productsList', { products, categories: categorias, toThousand });
            })
    },


    filtroPorCategoria: (req, res) => {
        let productsFilter = {}
        if (req.body.category) {
            let categoryId = req.body.category;
            productsFilter = {
                where: {
                    category_id: categoryId
                }
            }
        }
        Promise.all([
            db.Product_Categories.findAll(),
            db.Products.findAll(productsFilter)
        ])
            .then(function ([categorias, products]) {

                return res.render('products/productsList', { products, categories: categorias, toThousand });
            })
    },


    search: async function (req, res) {
        const notFound = "No hay productos que coincidan con su búsqueda"
        const keyWords = req.body.keyWords;
        let productsFilter = {}
        if (keyWords) {
            productsFilter = {
                where: {
                    [Sequelize.Op.or]: [
                        {
                            name: {
                                [Op.like]: '%' + keyWords + '%'
                            }
                        },
                        {
                            description: {
                                [Op.like]: '%' + keyWords + '%'
                            }
                        }
                    ]
                }
            }
        }
        let products = await db.Products.findAll(productsFilter);
        let categories = await db.Product_Categories.findAll();

        res.render('products/productsList', { toThousand, products, categories, notFound, word: req.body.keyWords });
    },

    //Código para la base de datos Json

    // deleteFromShoppingCart: (req, res) => {
    //     let shoppingCart = req.session.shoppingCart.filter (product => {
    //         return product.id != req.params.id;
    //     });

    //     req.session.shoppingCart = shoppingCart;

    //     return res.redirect ('/products/shoppingCart');
    // },

    // addToShoppingCart: (req, res) => {
    //     /* Crea el array shoppingCart si no existe. Agregar el nuevo producto comprado */
    //     !req.session.shoppingCart? req.session.shoppingCart = []: null;

    //     let addToCart = Product.findById (req.params.id);

    //     req.session.shoppingCart.push (addToCart);

    //     return res.redirect ('/products/shoppingCart');
    // },

    // shoppingCart: (req, res) => {
    //     if (!req.session.shoppingCart || req.session.shoppingCart.length == 0) {
    //         return res.render ('./products/shoppingCart', {categories});
    //     }

    //     let shoppingCart = req.session.shoppingCart;

    //     let subtotal = 0;

    //     shoppingCart.forEach ((product, index) => {
    //         subtotal = subtotal + (product.price * (1 - product.discount / 100));
    //     });

    //     return res.render ('./products/shoppingCart', {categories, shoppingCart, toThousand, subtotal});
    // },

    // productDetail: (req, res) => {

    //     let product = Product.findById(req.params.id);

    //     return res.render ('./products/productDetail', {product, toThousand, categories});

    // },

    // productsList: (req, res) => {
    //     if (req.query.category) {
    //         let categoryId = req.query.category;

    //         let products = Product.filterByCategory (categoryId);

    //         return res.render('products/productsList', {categoryId, products, categories, toThousand});
    //     } else {
    //         let products = Product.findAll();

    //         return res.render('products/productsList', {products, categories, toThousand});
    //     }

    // },

    // filtroPorCategoria:(req, res) => {
    //     let products = Product.findAll();

    //     if (req.body.category ==''){
    //         return  res.render('products/productsList', {products, categories, toThousand});
    // }

    //     const productosFiltrados = products.filter((producto)=>{
    //         return producto.category == req.body.category;
    //     })

    //     return res.render('products/productsList', {products: productosFiltrados, categories, toThousand});
    // },

    // search: function(req,res){
    //     const notFound= "No hay productos que coincidan con su búsqueda"
    //     const product= Product.findAll();
    //     const keyWords= req.body.keyWords.toLowerCase();


    //     const products= product.filter(valor=>{
    //         return valor.name.toLowerCase().includes(keyWords)
    //     });


    //     res.render('products/productsList', {toThousand, products, categories, notFound, word:req.body.keyWords});
    // },


    // agregarAlCarrito: (req, res) => {
    //     !locals.shoppingCart? res.locals.shoppingCart = []: null;

    //     let productBought = products.find (product => {
    //         return product.id == req.params.id;
    //     });

    //     shoppingCart.push (productBought);

    //     let subtotal = shoppingCart.reduce (sum, )

    //     res.redirect ('products/shoppingCart', { shoppingCart, categories, toThousand });
    // },

}


module.exports = controller;