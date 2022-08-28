const bcrypt= require('bcryptjs');
const {validationResult}= require('express-validator')


const Category = require ('../models/Category');
const Users= require('../models/Users');


const categories = Category.findAll();
let users= Users.findAll();

const usersController={
    login: function (req,res){
        if (req.query.msg) {
            let msg = req.query.msg;
            return res.render('./users/login', {categories, msg}) 
        } else {
            return res.render('./users/login', {categories}) 
        }
    },

    /**********************************************
     *****         AGREGUÉ LA FUNCIÓN logUser PARA PROBAR EL MIDDLEWARE QUE LIMITA LAS RUTAS
     *****         DE ACCESO A USUARIOS LOGONEADOS O NO LOGONEADOS
     ************************************************************/
    logUser: (req, res) => {
        if (req.body.email == 'marcela@gmail.com') {
            req.session.user = Users.findByPk (10);
        }

        return res.redirect ('/');
    },
    /**********************************************
     *****        FIN DEL AGREGADO
     ************************************************************/

    register: function(req, res){
      
            res.render('./users/register', {categories});
        },

    store: function(req,res){
        const error= "Tienes que subir una imagen";
        const check= 'check';
        const errors= validationResult(req);
        let file= req.file;  
        
       
        const userFind= users.filter(valor => {
            return valor.email==req.body.email
        });
       

        if(userFind.length==0){
            if(errors.isEmpty()){
                if(file!=undefined){
                    let userNew=req.body;
                    const passwordCrypt= bcrypt.hashSync(req.body.password,10);
                    userNew.password= passwordCrypt;
                    userNew.image=req.file.filename;
                    userNew.id=users[users.length-1].id +1 ;
                    users.push(userNew);
        
                    Users.writeFile(users);
    
                    res.redirect('/users/login');
                }else{
                    res.render('./users/register', {categories, error, old:req.body, check});
                }
            }else{
                res.render('./users/register', {categories, errors:errors.mapped(), error, old:req.body, check, file:req.file})
            }
        }else{
            const userExist="Ya existe un usuario registrado con este email";
            res.render('./users/register', {categories, userExist, old:req.body,errors:errors.mapped(), check})
        }
    },
    profile: (req, res) => {
        let user = Users.findByPk (req.params.id);

        delete user.password;

        user.image = '/images/users/' + user.image;

        if (req.query.msg) {
            let msg = req.query.msg;
            res.render ('./users/profile', {user, categories, msg})
        } else {
            res.render ('./users/profile', {user, categories})
        }
    }
}

module.exports=usersController;