const userNotLoggedMiddleware = function(req, res, next) {
    if (req.session.user) {
        let userId = req.session.user.id;
        let msg = 'Ya ingresaste al sitio';
        return res.redirect ('/users/profile/'+ userId +'?msg=' + msg);
    }

    next();
}

module.exports = userNotLoggedMiddleware;