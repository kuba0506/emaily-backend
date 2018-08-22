const localtunnel = require('localtunnel');
const PORT = process.env.PORT || 3090;

localtunnel(PORT, { subdomain: 'asdoasjdpo1123' }, function(e, tunnel) {
    console.log('Local tunnel is running');
});