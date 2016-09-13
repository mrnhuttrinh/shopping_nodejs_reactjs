var facebook = require('./facebook');
// var twitter = require('./twitter');
var google = require('./google');

var models = require('../models');
var User = models.User;

module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.find({where: { id: id }}).then(function(user) {
            done(null, user);
        }).catch(function(err) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            logger("ERROR", err);
            done(err);
        });
    });

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
    google(passport);
}