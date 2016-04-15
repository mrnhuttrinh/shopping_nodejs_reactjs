var jwt = require("jsonwebtoken");
var config = require("./config");

module.exports = function ensureAuthorized(req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        var token = bearer[1];
        console.log(token)
        jwt.verify(token, config.secret, function(err, userToken) {
            if (err) {
                return res.status(403).send({ 
                    error: err
                });
            } else {
                // if everything is good, 
                // save to request for use in other routes
                req.userToken = userToken;
                // decode 
                // { 
                //      employer: { 
                //          id: 'C507A540-9C3B-4C7F-BF4F-888875CD3019',
                //          username: 'user1',
                //          email: null,
                //          password: '24c9e15e52afc47c225b757e7bee1f9d',
                //          level: 0,
                //          info: 'Admin',
                //          fullname: null,
                //          address: null,
                //          phone: null,
                //          image: null 
                //      },
                //      iat: 1460715592,
                //      exp: 1460801992 
                //  }
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            error: {
                message: 'No token provided.'
            }
        });
        
    }
}