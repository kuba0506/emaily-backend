console.log(`Running app in ${process.env.NODE_ENV} envirnoment`)

if (process.env.NODE_ENV == 'production') {
    console.log('loading prod keys ....')
    module.exports = require('./prod');
} else {
    console.log('loading dev keys ....')
    module.exports = require('./dev');
}