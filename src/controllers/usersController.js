const Product = require ('../models/Product');
const Category = require ('../models/Category');

const categories = Category.findAll();

const usersController={
    login: function (req,res){
        res.render('./users/login', {categories});  
    },

    register: function(req, res){
        res.render('./users/register', {categories});
    }
}

module.exports=usersController;