console.log(`Running app in ${process.env.NODE_ENV} envirnoment`)

if (process.env.NODE_ENV = 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}