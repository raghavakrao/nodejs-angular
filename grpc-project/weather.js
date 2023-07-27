
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
app.use(compression());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

const {weatherHandler} = require('./controller/weather')
const {auth} = require('./middleware');

app.get('/api/weather', auth, weatherHandler);

// Error handlers
app.use(function (err, req, res, next) {
    console.error("error", err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: process.env.NODE_ENV== 'production' ? {} : err,
        success: false
    });
});

module.exports = app;