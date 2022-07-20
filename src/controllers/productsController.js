
const controlador = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        res.render ('./products/productDetail');
    }

}

module.exports = controlador;