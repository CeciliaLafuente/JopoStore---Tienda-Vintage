const express = require ('express');
const path = require ('path');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

const router = express.Router();

router.get ('/createProduct', productsController.createProduct);

router.get ('/modifyProduct', productsController.modifyProduct);

module.exports = router;