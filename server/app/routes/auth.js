var express = require('express');
var router  = express.Router();
var path = require("path");

module.exports = function(passport) {
    // route for facebook authentication and login
    // different scopes while logging in
    router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/auth/profile',
            failureRedirect : '/'
        })
    );

    router.get('/google', passport.authenticate('google', { scope : 'email' }));

    // handle the callback after google has authenticated the user
    router.get('/google/callback',
        passport.authenticate('google', {
            successRedirect : '/auth/profile',
            failureRedirect : '/'
        })
    );

    router.get("/profile", function(req, res) {
        var user = req.user["dataValues"];
        res.render('profile', { user: user });
        // res.sendFile(path.join(__dirname + '../../templates/profile.html'));
        // res.redirect('/#/login/1');
    });

    // router.get('/facebook/callback',
    //     passport.authenticate('facebook', {
    //         failureRedirect : '/'
    //     }), function(req, res) {
    //         console.log("user", req.user["dataValues"]);
    //         if (req.user) {
    //             res.redirect("/");
    //         } else {
    //             res.redirect("/#/profile");
    //         }
    //     }
    // );
    return router;
};