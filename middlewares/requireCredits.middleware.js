module.exports = (req, res, next) => {
    // user model -> req.user (set by passport)
    // check if user has enough credits to pay for something
    // console.log('Credits: ', req.user.credits);
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
};