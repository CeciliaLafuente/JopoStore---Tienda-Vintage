
const controlador = {
    createProduct: (req, res) => {
        res.render ('./admin/createProduct');
    },
    modifyProduct: (req, res) => {
        res.render ('./admin/modifyProduct');
    }


}

module.exports = controlador;