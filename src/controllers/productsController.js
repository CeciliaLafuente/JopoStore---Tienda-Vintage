const fs= require('fs');
const path= require ('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

    shoppingCart: (req, res) => {
<<<<<<< HEAD
        res.render ('products/shoppingCart');
    },
=======
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        let product = products.find ( valor => {
            return valor.id == req.params.id;
        });

        res.render ('./products/productDetail', {product, toThousand});
    }
>>>>>>> 4685b506e887dc007699bc91971f7fc33472b180

    productDetail: (req, res) => {
    let product = products.filter(valor => {
        return valor.id == req.params.id;
    });
    res.render ('./products/productDetail', {product});
    },

    productsList: (req, res) => {
    res.render('products/productsList', {products: products});
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

    // productsList: (req, res) => {
    // let product= products.filter(valor=>{
    // return valor.id== req.params.id;
    // });
    }


module.exports = controller;