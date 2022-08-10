const express = require ('express');
const path = require ('path');
const multer= require ('multer');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

const router = express.Router();

const storage = multer.diskStorage ( {
    destination: (req, file, cb) => {
        let folder = 'public/images/' + req.body.category;
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        let fileName =  req.body.category + '-' + Date.now() + path.extname(file.originalname);
        cb (null, fileName);
    }
} );

let upload = multer ({storage});


router.get ('/createProduct', adminController.createProduct);
router.post ('/createProduct', upload.single('image'), adminController.storeProduct);

router.get ('/productDetail/:id', adminController.productDetail);

router.get('/edit/:id', adminController.edit);
router.put('/:id', upload.single('image'), adminController.update);

router.delete('/delete/:id', adminController.destroy);

router.get ('/productsListAdmin', adminController.productsList);

router.post ('/productsListAdmin/filtro', adminController.filtroPorCategoria);


module.exports = router;