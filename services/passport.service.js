const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/');
const mongoose = require('mongoose');

const UserModel = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user (model instance) is passed from googlestrategy callback done fn
    return done(null, user.id); // id from mongo record, this approach is good when we use many providers
});

passport.deserializeUser(async (userId, done) => {
    // search for user in collection
    try {
        const user = await UserModel.findById(userId);
        return done(null, user);
    } catch (e) {
        return done(e, null);
    }
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // saving profile.id to authenticate in future
            const existingUser = await UserModel.findOne({ googleID: profile.id });

            if (!existingUser) {
                const newUser = await new UserModel({ googleID: profile.id }).save();
                return done(null, newUser);
            }

            return done(null, existingUser);
        } catch (e) {
            return done(e, null);
        }
    }
    ));