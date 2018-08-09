const env = process.env.NODE_ENV.trim();

console.log(`Running app in ${env} envirnoment`)

if (env === 'production') {
    console.log('loading prod keys ....')
    module.exports = require('./prod');
} else {
    console.log('loading dev keys ....')
    module.exports = require('./dev');
}