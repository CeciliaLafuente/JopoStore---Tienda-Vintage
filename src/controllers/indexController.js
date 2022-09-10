const Category = require('../models/Category');
const Product = require('../models/Product');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const indexController = {

    vistaIndex: (req, res) => {
        let categories = Category.findAll();
        let products = Product.findAll()

        res.render('index', { categories, products, toThousand});
    },
}

module.exports = indexController;

