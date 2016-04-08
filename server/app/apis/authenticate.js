// get an instance of the routers for api routes
var apiRoutes = express.Router();

// route to show a random message
apiRoutes.get("/", function(req, res) {
    res.json({
        message: "Welcome to the coolest API on earth!"
    });
});

// route to return all user 
// /api/users
apiRoutes.get("/users", function(req, res) {
    // return all user
    // http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
    // 
    // https://devdactic.com/restful-api-user-authentication-1/
    // 
    // http://www.sitepoint.com/using-json-web-tokens-node-js/
});

module.exports = apiRoutes;
// // apply the routes to our application with the prefix /api
// app.use('/api', apiRoutes);