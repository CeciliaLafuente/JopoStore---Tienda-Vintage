const express = require ('express');
const path = require ('path');

const productsController = require (path.join (__dirname, '../controllers/productsController'));

const router = express.Router();

router.get ('/shoppingCart', productsController.shoppingCart);

router.get ('/productDetail/:id', productsController.productDetail);

router.get ('/productsList', productsController.productsList);

<<<<<<< HEAD
router.post ('/productsList/filtro', productsController.filtroPorCategoria);

=======
>>>>>>> 4685b506e887dc007699bc91971f7fc33472b180
module.exports = router;