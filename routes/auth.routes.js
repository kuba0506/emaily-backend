const passport = require('passport');
const config = require('../config/');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // what data we're asking google for
    }), (req, res) => {
        console.log('/auth/google');
    }
    );

    // code from google is available
    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            return res.redirect(`${config.host}/surveys`);
            // return res.redirect('/surveys');
        });

    app.get('/api/logout', (req, res) => {
        console.log('log out');
        // req.logout() , fn attached by passport, removes cookies
        req.logout();
        if (!req.user) return res.redirect(`${config.host}/`);
        // if (!req.user) return res.redirect('/');
    });

    // test authentication
    app.get('/api/current_user', (req, res) => {
        // req.user is added by passport.deserializeUser (middleware)
        return res.send(req.user);
        // return res.send(req.session);
    });
};

