require('dotenv').config();

let apiServer = process.env.BACKEND_URL ?? 'http://locahost:8443/';

module.exports = {
    '/api': {
        target: apiServer,
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
    },
};
