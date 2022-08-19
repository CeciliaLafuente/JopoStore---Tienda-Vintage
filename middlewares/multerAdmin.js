const path = require ('path');
const multer= require ('multer');
const Category = require ('../src/models/Category');

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

module.exports=upload;