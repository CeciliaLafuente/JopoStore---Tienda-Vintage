const Product = require('../models/Product');
const Category = require ('../models/Category');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    createProduct: (req, res) => {
        let categories = Category.findAll();

        return res.render ('./admin/createProduct', {categories});
    },
    
    storeProduct: (req, res) => {
        let products = Product.findAll();
       
        /***** Obtengo el máximo ID utilizado *****/
        let maxId = Math.max ( ...products.map ( product => {
                return product.id;
        }));

        let categoryName = Category.findById(req.body.category).name;

        /***** Completo los campos del nuevo producto *****/
        let newProduct = req.body;
        
        newProduct.price = parseInt (newProduct.price);
        newProduct.discount = newProduct.discount != ''? parseInt (newProduct.discount) : 0;
        newProduct.id = maxId + 1;
        newProduct.image = '/images/products/' + categoryName + '/' + req.file.filename;
        newProduct.special = req.body.special? 1:0;

        Product.addProduct (newProduct);

        return res.redirect ('/admin');
    },

    productDetail: (req, res) => {
        let product = Product.findById (req.params.id);
        
        return res.render ('./admin/productDetailAdmin', {product, toThousand});
    },

    edit: function (req,res){
        let categories = Category.findAll();

        let productFind = Product.findById (req.params.id);

        return res.render('./admin/modifyProduct', {productFind, categories});
    },

    update: function (req,res){
        let products = Product.findAll();

        products.forEach(valor=>{
            if (valor.id==req.params.id){
                valor.name=req.body.name;
                valor.description=req.body.description;
                valor.category=req.body.category;
                valor.price= parseInt(req.body.price);
                valor.discount = req.body.discount = ''? 0 : parseInt(req.body.discount);
                valor.special = req.body.special? 1:0;
            }
        });
        
        let categoryName = Category.findById(req.body.category).name;

        if (req.file){
            products.forEach(valor=>{
                if (valor.id==req.params.id){
            valor.image= '/images/products/' + categoryName + '/' + req.file.filename;
                }
            });
        }
                  
        Product.writeFile (products);
    
        return res.redirect('/admin');
    },

    destroy: function (req,res){
        let products = Product.findAll();
       
        products = products.filter (product => {
            return product.id != req.params.id;
        });

        Product.writeFile (products);

        res.redirect ('/admin');
    },

    productsList: (req, res) => {
        let categories = Category.findAll();

        let products = Product.findAll();
       
        // res.render('admin/productsListAdmin', {products: products});
        res.render('admin/PRUEBAlistado', {products, toThousand, categories});
    },
    
    filtroPorCategoria:(req, res) => {
        let products = Product.findAll();
       
        if (req.body.category ==''){
            return  res.render('admin/productsListAdmin', {products: products});
        }

        const productosFiltrados = products.filter((producto)=>{
            return producto.category == req.body.category;
        })

        res.render('admin/productsListAdmin', {products: productosFiltrados});
    },

    
}


module.exports = controller;