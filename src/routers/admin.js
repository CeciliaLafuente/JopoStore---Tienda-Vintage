const express = require ('express');
const path = require ('path');
const multer= require ('multer');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

const Category = require ('../models/Category');

const router = express.Router();

const storage = multer.diskStorage ( {
    destination: (req, file, cb) => {
        let categoryName = Category.findById(req.body.category).name;
        let folder = 'public/images/products/' + categoryName;
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        let categoryName = Category.findById(req.body.category).name;
        let fileName =  categoryName + '-' + Date.now() + path.extname(file.originalname);
        cb (null, fileName);
    }
} );

let upload = multer ({storage});

router.get ('/', adminController.productsList);

router.get ('/createProduct', adminController.createProduct);
router.post ('/createProduct', upload.single('image'), adminController.storeProduct);

router.get ('/productDetail/:id', adminController.productDetail);

router.get('/edit/:id', adminController.edit);
router.put('/:id', upload.single('image'), adminController.update);

router.delete('/delete/:id', adminController.destroy);

router.get('/productsList', adminController.productsList)

module.exports = router;