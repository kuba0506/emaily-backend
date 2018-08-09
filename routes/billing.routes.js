const config = require('../config');
const stripe = require('stripe')(
    config.stripeSecretKey
);
const require_login_middleware = require('../middlewares/requireLogin.middleware');

module.exports = (app) => {
    app.post('/api/stripe', require_login_middleware, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        // console.log(charge);
        // user model -> req.user (set by passport)
        // update user credits
        req.user.credits += 5;
        const updated_user = await req.user.save();

        return res.send(updated_user);
    });
}