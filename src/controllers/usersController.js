const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const Category = require("../models/Category");
const Users = require("../models/Users");

const categories = Category.findAll();
let users = Users.findAll();

const usersController = {
    login: function (req, res) {
        if (req.query.msg) {
            let msg = req.query.msg;
            return res.render('./users/login', { categories, msg })
        } else {
            return res.render('./users/login', { categories })
        }
    },

    register: function (req, res) {
        res.render("./users/register", { categories });
    },

    store: function (req, res) {
        const error = "Tienes que subir una imagen";
        const check = "check";
        const errors = validationResult(req);
        let file = req.file;

        const userFind = users.filter((valor) => {
            return valor.email == req.body.email;
        });

        if (userFind.length == 0) {
            if (errors.isEmpty()) {
                if (file != undefined) {
                    let userNew = req.body;
                    const passwordCrypt = bcrypt.hashSync(req.body.password, 10);
                    userNew.password = passwordCrypt;
                    userNew.image = req.file.filename;
                    userNew.id = users[users.length - 1].id + 1;
                    users.push(userNew);

                    Users.writeFile(users);

                    res.redirect("/users/login");
                } else {
                    res.render("./users/register", {
                        categories,
                        error,
                        old: req.body,
                        check,
                    });
                }
            } else {
                res.render("./users/register", {
                    categories,
                    errors: errors.mapped(),
                    error,
                    old: req.body,
                    check,
                    file: req.file,
                });
            }
        } else {
            const userExist = "Ya existe un usuario registrado con este email";
            res.render("./users/register", {
                categories,
                userExist,
                old: req.body,
                errors: errors.mapped(),
                check,
            });
        }
    },
    profile: (req, res) => {

        let user = Users.findByPk(req.params.id);

        delete user.password;

        user.image = "/images/users/" + user.image;

        if (req.query.msg) {
            let msg = req.query.msg;
            res.render('./users/profile', { user, categories, msg })
        } else {
            res.render('./users/profile', { user, categories })
        }
    },

    editProfile: function(req,res){
        let user = Users.findByPk(req.params.id);

        res.render('./users/editProfile', {user, categories})
    },

    updateProfile: function(req,res){
      users.forEach(valor => {
                if(valor.id== req.params.id){

                    valor.first_name= req.query.first_name;
                    valor.last_name= req.query.last_name;
                    valor.email= req.query.email;
                    valor.phone= req.query.phone;

                    if(req.query.password){
                        valor.password= req.query.password
                    } else{
                        valor.password= valor.password
                    }
                    
                    if(req.query.image){
                        valor.image= req.query.image
                    } else{
                        valor.image= valor.image
                    }
                }
                });

                    Users.writeFile(users);


        res.redirect('/')
    },

    loginProcess: (req, res)=> {
        console.log(req.session.userLogged)
        let error = validationResult(req);

        if (!error.isEmpty()) {
            return res.render("./users/login", {
                userToLogin: {},
                categories,
                errors: error.mapped(),
                old: req.body
        
            })
        }

        let userToLogin = Users.findByField("email", req.body.email)
        if (userToLogin) {

            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
console.log (req.sessionUserLogged);
                res.redirect("/")
            } else {
                res.render("./users/login", {
                    userToLogin,
                    categories,
                    errors: {
                        password: {
                            msg: "La contraseña es incorrecta"
                        },
                        old: req.body
                    }
                })
            }
        } else {
            res.render("./users/login", {
                userToLogin,
                categories,
                errors: {
                    email: {
                        msg: "No se encuentra este email en nuestra base de datos"
                    }
                }
            })
        }
    },

    logout:(req, res)=>{
        req.session.destroy();
return res.redirect('/');
    }
};

module.exports = usersController;
