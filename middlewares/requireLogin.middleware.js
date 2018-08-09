module.exports = (req, res, next) => {
    // user model -> req.user (set by passport)
    // check if user is logged in
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }

    next();
};