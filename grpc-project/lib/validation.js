const Joi = require('@hapi/joi');

function authenticateRequest(request){
    const schema = Joi.object().options({ abortEarly: false }).keys({
        username: Joi.string().max(100).required(),
        password: Joi.string().required(),
    });
    return schema.validate(request);
}
module.exports = {
    authenticateRequest
}