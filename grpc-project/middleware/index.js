const { authClient } = require("../client");

async function auth(req, res, next){
    try {
        const isValidToken = await validateToken(req, next);
        if(isValidToken === "false"){
            return res.status(401).json({ success: false, message: 'Token is invalid or expired'});
        }
    return next();
} catch (error) {
    next(error);
} 
}

async function validateToken(req, next) {
    return new Promise((resolve, reject) => {
        let token = /Bearer (.+)/.exec(req.header('authorization'));
        if(!token) {
            resolve(false);
        }
        authClient.isAccessTokenValide({accessToken: token[1]}, (err, data) => {
            if (!err){
                resolve(data.isTokenValide);
            }else{
                reject(err);
            }
        })
    });
}

module.exports = {
    auth
}