const express = require('express');
const config = require('./config/');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); // store seesion in a cookie
// apart from express-cookie that store only userId, session is stored in session store 
const app = express();
const PORT = process.env.PORT || 3090;

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 *60 *1000, // 30 days
    keys: [config.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// db setup
require('./models/user.model');
mongoose.connect(config.mongoURI);

// services
require('./services/passport.service');
// routes
require('./routes/auth.routes')(app);
require('./routes/billing.routes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up prod assets, like main.js or main.css
    app.use(express.static('../client/build'));

    // Express will serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        return res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

// launch server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// console.log(process.env.NODE_ENV)