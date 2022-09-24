const db= require('../src/database/models')

function cookieMiddleware(req, res, next) {
    res.locals.isLogged=false;

    let emailInCookie=[];

console.log (req.cookies.remember_user);

       if(req.cookies.remember_user!=undefined){
            emailInCookie = req.cookies.remember_user;
       }else{
            emailInCookie= 'default@hotmail.com'
       }

console.log('emailInCookie', emailInCookie) ;

        db.Users.findOne({
            where:{
                email: emailInCookie
            }
        })
        .then(function(userFromCookie){

console.log ('userFromCookie: ', userFromCookie);

            if (userFromCookie!=null) {
                req.session.userLogged = userFromCookie;
            }

console.log ('req.session.userLogged: ', req.session.userLogged);   

            if (req.session && req.session.userLogged) {
                res.locals.isLogged = req.session.userLogged;
                // locals = req.session.userLogged;
            } 
console.log ('res.locals.userLogged: ', res.locals.userLogged);             
        })

        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.isLogged = req.session.userLogged;
        } 
                    
    next();
}

module.exports = cookieMiddleware;



// const User = require('../src/models/Users')

// function cookieMiddleware(req, res, next) {
//     res.locals.isLogged = false;


//     let emailInCookie = req.cookies.userEmail;
//     let userFromCookie = User.findByField('email', emailInCookie)

//     if (userFromCookie) {
//         req.session.userLogged = userFromCookie;
//     }

//     if (req.session && req.session.userLogged) {
//         res.locals.isLogged = true;
//         res.locals.isLogged = req.session.userLogged;
//     }

    
//     next();
// }

// module.exports = cookieMiddleware;