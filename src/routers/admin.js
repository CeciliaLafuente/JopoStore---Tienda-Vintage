const express = require ('express');
const path = require ('path');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

const router = express.Router();

router.get ('/createProduct', adminController.createProduct);

router.get ('/modifyProduct', adminController.modifyProduct);

module.exports = router;