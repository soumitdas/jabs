const expressJwt = require("express-jwt");

const isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: "auth"
});

const isAuthenticated = (req, res, next) => {
    //TODO: Complete it...
    
    next();
}

const isAdmin = (req, res, next) => {
    
    const { role } = req.auth;
    if (role === "admin"){
        return next();
    }
    next(new Error("User must be an admin"));
}

const isSellerOrAdmin = (req, res, next) => {
    
    const { role } = req.auth;
    if (role === "admin" || role === "seller"){
        return next();
    }
    next(new Error("User must be a seller or an admin"));
}

module.exports = { isSignedIn, isAuthenticated, isAdmin, isSellerOrAdmin }