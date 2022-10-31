const express = require ('express');

const categoriesApiController = require ('../../controllers/api/categoriesController');

const router = express.Router();

router.get ( '/', categoriesApiController.list );


module.exports = router;