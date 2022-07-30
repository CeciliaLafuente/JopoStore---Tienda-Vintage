const path = require('path');
const fs = require('fs');

let productsFilePath = path.join (__dirname, '../data/productsDataBase.json');

let products = JSON.parse ( fs.readFileSync (productsFilePath, 'utf-8') );

const controlador = {
    createProduct: (req, res) => {
        res.render ('./admin/createProduct');
    },
    storeProduct: (req, res) => {
        console.log (req.body),
        console.log (req.file);

        /***** Obtengo el máximo ID utilizado *****/
        let maxId = Math.max ( ...products.map ( product => {
                return product.id;
        }));

        /***** Completo los campos del nuevo producto *****/
        let newProduct = req.body;
        newProduct.id = maxId + 1;
        newProduct.image = './images/' + req.body.category + '/' + req.file.filename;

        products.push (newProduct);

        fs.writeFileSync ( productsFilePath, JSON.stringify (products, null, ' ' ) );

        res.redirect ('/');

        



    },
    modifyProduct: (req, res) => {
        res.render ('./admin/modifyProduct');
    }


}

module.exports = controlador;