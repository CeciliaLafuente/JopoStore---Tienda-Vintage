const fs= require('fs');
const path= require ('path');

const productsPath= path.join(__dirname,'../data/productsDataBase.json');
const products= JSON.parse(fs.readFileSync(productsPath, 'utf-8'));


const controller = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        let product= products.filter(valor=>{
            return valor.id== req.params.id;
        });
        res.render ('./products/productDetail', {product});
    },

}

module.exports = controller;