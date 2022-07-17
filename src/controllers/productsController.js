
const controlador = {
    shoppingCart: (req, res) => {
        res.render ('./products/carrito');
    },
    productDetail: (req, res) => {
        res.render ('./products/productDetail');
    }

}

module.exports = controlador;