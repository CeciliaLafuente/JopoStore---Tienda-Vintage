
const controlador = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        res.render ('./products/productDetail');
    },
    createProduct: (req, res) => {
        res.render ('./products/createProduct');
    }

}

module.exports = controlador;