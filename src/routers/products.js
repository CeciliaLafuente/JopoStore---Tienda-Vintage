const express = require ('express');
const path = require ('path');

const productsController = require (path.join (__dirname, '../controllers/productsController'));

const router = express.Router();

router.get ('/shoppingCart', productsController.shoppingCart);

router.get ('/productDetail/:id', productsController.productDetail);



module.exports = router;