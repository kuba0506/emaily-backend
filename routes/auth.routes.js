const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // what data we're asking google for
    }));
    
    // code from google is available
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    app.get('/api/logout', (req, res) => {
        // req.logout() , fn attached by passport, removes cookies
        req.logout();
        return res.send(req.user);
    });

    // test authentication
    app.get('/api/current_user', (req, res) => {
        // req.user is added by passport.deserializeUser (middleware)
        return res.send(req.user);
        // return res.send(req.session);
    });
};

