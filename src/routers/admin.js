const express = require ('express');
const path = require ('path');
const multer= require ('multer');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

let storage= multer.diskStorage({
    destination: (req, file,cb)=>{
        let carp=req.body.category;
        cb(null, path.join('public/images'));
    },
    filename: (req, file,cb)=>{
        let carp=req.body.category;
        cb(null,`/${carp}` +'/' + Date.now() + path.extname(file.originalname));
    },
});

let upload= multer({storage:storage});

const router = express.Router();

router.get ('/createProduct', adminController.createProduct);

router.get ('/productDetail/:id', adminController.productDetail);

router.get('/edit/:id', adminController.edit);
router.put('/:id', upload.single('image'), adminController.update);

router.delete('/delete/:id', adminController.destroy);


module.exports = router;