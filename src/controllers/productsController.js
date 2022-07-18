
const controlador = {
    shoppingCart: (req, res) => {
        res.render ('./products/shoppingCart');
    },
    productDetail: (req, res) => {
        res.render ('./products/productDetail');
    },
    createProduct: (req, res) => {
        res.render ('./products/createProduct');
    },
    modifyProduct: (req, res) => {
        res.render ('./products/modifyProduct');
    }


}

module.exports = controlador;