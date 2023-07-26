const express = require('express');
const axios = require('axios');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// const grpc = require('simple-grpc-connector');
const compression = require('compression');
const bodyParser = require('body-parser');
const { Users } = require('./db/models');
const config  = require('./config');
const { verifyPassword } = require('./lib/utilities')
const app = express();
const PORT = 8000;
app.use(compression());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

// Initialize gRPC connection to the Weather Data Service
// const weatherService = new grpc.Client('localhost:8001', grpc.credentials.createInsecure());

app.post('/authenticate', async (req, res, next) => {
    try {
        const { error, value: payload } = validateAuthenticateRequest(req.body);
        if (error) {
            return res.status(400).send({error: error.details[0].message, success:false});
        }
        const user = await Users.findOne({
            where: {
                username: payload.username
            },
            attributes:['id', 'password', 'email']
        });
        if(user){
            if(await verifyPassword(payload.password, user.password)){
                console.log("password verified");
                const accessToken = generateToken({userId: user.id, username: payload.username, email: user.email})
                return res.status(200).json({
                    success: true,
                    access_token: accessToken,
                });
            }
        }
        return res.status(401).json({
            success: false,
            error: "Incorrect username or password"
        });
    } catch (error) {
        next(error);
    }
});

function validateAuthenticateRequest(request){
    const schema = Joi.object().options({ abortEarly: false }).keys({
        username: Joi.string().max(100).required(),
        password: Joi.string().required(),
    });
    return schema.validate(request);
}

function generateToken(payload) {
    const expiry = (!config.jwt.expiryTime || config.jwt.expiryTime  === "0")?{}: {expiresIn: config.jwt.expiryTime };
    return jwt.sign(payload,  config.jwt.secretKey,  expiry );
}

// Your implementation for isAccessTokenValid function over gRPC
app.post('/isAccessTokenValid', async (req, res, next) => {
    try {
        const { accessToken } = req.body;
        return jwt.verify(accessToken, config.jwt.secretKey, function(err, decoded) {
            if(err){
                console.error(err);
            }
            return (decoded)?true:false;
        });
    } catch (error) {
        next(error);
    }
});

// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: process.env.NODE_ENV== 'production' ? {} : err,
        success: false
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
