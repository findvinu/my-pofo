module.exports.logger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}

module.exports.authenticate = (req, res, next) => {
    let isLoggedIn = req.session.isLoggedIn;

    if(isLoggedIn){
        next()
    } else{
        res.redirect('/login');
    }
}

// check if user available or not
module.exports.authenticated = (req, res, next) => {
    let isLoggedIn = req.session.isLoggedIn;

    if(isLoggedIn){
        res.locals.user = req.session.user
        next();
    } else{
        next();
    }
}