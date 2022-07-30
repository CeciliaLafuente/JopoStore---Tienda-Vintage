const express = require ('express');
const path = require ('path');
const multer = require('multer');

const router = express.Router();
const adminController = require (path.join (__dirname, '../controllers/adminController'));

const storage = multer.diskStorage ( {
    destination: (req, file, cb) => {
        let folder = path.join (__dirname, '../../public/images/' + req.body.category);
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        let fileName =  req.body.category + '-' + Date.now() + path.extname(file.originalname);
        cb (null, fileName);
    }
} );

let uploadFile = multer ({storage});


router.get ('/createProduct', adminController.createProduct);
router.post ('/createProduct', uploadFile.single('image'), adminController.storeProduct);

router.get ('/modifyProduct', adminController.modifyProduct);

module.exports = router;