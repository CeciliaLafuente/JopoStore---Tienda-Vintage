const fs= require('fs');
const path= require ('path');

const productsPath= path.join(__dirname,'../data/productsDataBase.json');
const products= JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        let product = products.find ( valor => {
            return valor.id == req.params.id;
        });

        res.render ('./products/productDetail', {product, toThousand});
    }

}

module.exports = controller;