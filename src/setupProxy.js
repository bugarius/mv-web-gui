const proxy = require('http-proxy-middleware');
const apiUrl = 'http://localhost:5000';
module.exports = function (app) {
    app.use('/auth', proxy({target: apiUrl}));
    app.use('/ajax', proxy({target: apiUrl}));
    app.use('/pdf', proxy({target: apiUrl}));
};