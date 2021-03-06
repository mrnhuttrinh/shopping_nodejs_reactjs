var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var models = require('../models');
var User = models.User;
var config = require("../config");
var fbConfig = config.openAuthentication;
var logger = require("../logger");
module.exports = function(passport) {
    passport.use(new GoogleStrategy({

        clientID        : fbConfig.googleAuth.clientID,
        clientSecret    : fbConfig.googleAuth.clientSecret,
        callbackURL     : fbConfig.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.find({where: { id: profile.id }}).then(function(user) {

                // if the user is found, then log them in
                if (user) {
                    // has exist
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {};

                    // set all of the facebook information in our user model
                    newUser.id    = profile.id; // set the users facebook id                 
                    newUser.token = access_token; // we will save the token that facebook provides to the user                    
                    newUser.fullname = profile.displayName;
                    if (profile.emails && profile.emails.length) {
                        newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    }
                    newUser.type = "Google";
                    newUser.gender = profile.gender === 'male' ? 1 : 0;
                    if (profile.photos && profile.photos.length) {
                        newUser.image = profile.photos[0].value;
                    }

                    // save our user to the database
                    User.create(newUser).then(function() {
                        newUser["_new"] = true;
                        // not exist
                        return done(null, newUser);
                    }).catch(function(err) {
                        logger("ERROR", err);
                        return done(err);
                    });
                }
            }).catch(function(err) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                logger("ERROR", err);
                return done(err);
            });

        });

    }));
};