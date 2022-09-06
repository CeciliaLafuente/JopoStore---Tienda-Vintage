const userLoggedMiddleware = function(req, res, next) {
    if (!req.session.user) {
        let msg = 'Por favor ingresá al sitio para continuar';
        return res.redirect ('/users/login/?msg=' + msg);
    }

    next();
}

module.exports = userLoggedMiddleware;