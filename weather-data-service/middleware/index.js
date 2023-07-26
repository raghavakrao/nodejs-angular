async function auth(req, res, next){
    // req.userId = 1;
    // return next();
    const isValidToken = validateToken(req);
    if(!isValidToken){
        // return res.status(401).send({errors:["Missing or invalid authentication token."], success:false});
        return res.status(401).json({
            success: false,
            message: 'Token is invalid or expired',
          });
    }
    return next();
}

function validateToken(req) {
    let token = /Bearer (.+)/.exec(req.header('authorization'));
    if(!token) {
        return false
    }
    // Call isAccessTokenValid function from athentication-service
}

module.exports = {
    auth
}