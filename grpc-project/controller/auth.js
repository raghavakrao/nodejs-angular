const grpc = require('@grpc/grpc-js');
const { Users } = require('../db/models');
const config  = require('../config');
const jwt = require('jsonwebtoken');
const { verifyPassword } = require('../lib/utilities')

function generateToken(payload) {
    const expiry = (!config.jwt.expiryTime || config.jwt.expiryTime  === "0")?{}: {expiresIn: config.jwt.expiryTime };
    return jwt.sign(payload,  config.jwt.secretKey,  expiry );
}

const authenticateHandler = async (req, res)=>{
    try{
        const user = await Users.findOne({
            where: {
                username: req.request.username
            },
            attributes:['id', 'password', 'email']
        });
        let accessToken = "";
        if(user){
            if(await verifyPassword(req.request.password, user.password)){
                accessToken = generateToken({userId: user.id, username: req.request.username, email: user.email})
            }
        }
        res(null, {
            token: accessToken,
        });
    } catch (err) {
        res({
            message: err.message,
            code: grpc.status.INTERNAL
        });
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