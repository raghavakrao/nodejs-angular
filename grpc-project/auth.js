const {authClient} = require("./client");
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const validation  = require('./lib/validation');
const app = express();
app.use(compression());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

app.post('/authenticate', async (req, res, next) => {
    try {
        const { error, value: payload } = validation.authenticateRequest(req.body);
        if (error) {
            return res.status(400).send({error: error.details[0].message, success:false});
        }
        authClient.Authenticate(payload, (err, data) => {
            if (!err){
                if(data.token){
                    return res.status(200).send({
                        success: true,
                        access_token: data.token
                    });
                }else{
                    return res.status(401).json({
                        success: false,
                        error: "Incorrect username or password"
                    });
                }
            }else{
                return res.status(500).json({
                    success: false,
                    error: "Something went wrong at server side."
                });
            }
        });
    } catch (error) {
        next(error);
    }
});

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