const grpc = require('@grpc/grpc-js');
const { Users } = require('../db/models');
const config  = require('../config');
const jwt = require('jsonwebtoken');
const { verifyPassword } = require('../lib/utilities')
const validation  = require('../lib/validation');

function generateToken(payload) {
    const expiry = (!config.jwt.expiryTime || config.jwt.expiryTime  === "0")?{}: {expiresIn: config.jwt.expiryTime };
    return jwt.sign(payload,  config.jwt.secretKey,  expiry );
}

const authenticateHandler = async (req, res, next)=>{
    try{
        const { error, value: payload } = validation.authenticateRequest(req.body);
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
                accessToken = generateToken({userId: user.id, username: payload.username, email: user.email});
                return res.status(200).send({
                    success: true,
                    access_token: accessToken
                });
            }
        }
        return res.status(401).json({
            success: false,
            error: "Incorrect username or password"
        });
        
    } catch (err) {
        next(err)
    }
}

const tokenHandler = async (req, res)=>{
    try {
        const isTokenValide = jwt.verify(req.request.accessToken, config.jwt.secretKey, function(err, decoded) {
            if(err){
                console.error(err);
            }
            return (decoded)?true:false;
        });
        res(null, {
            isTokenValide: isTokenValide,
        });
    } catch (err) {
        res({
            message: err.message,
            code: grpc.status.INTERNAL
        });
    }
}

module.exports = {
    authenticateHandler,
    tokenHandler
}