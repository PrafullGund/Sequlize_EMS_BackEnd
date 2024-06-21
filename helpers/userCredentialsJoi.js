const Joi = require('joi');

const userCredentialsJoi = Joi.object({
    UserId: Joi.number().required().messages({
        'any.required': '"UserId" is required',
        'number.base': '"UserId" must be a number'
    }),

    Email: Joi.string().email().required().messages({
        'any.required': '"Email" is required',
        'string.empty': '"Email" cannot be an empty field',
        'string.email': '"Email" must be a valid email'
    }),

    Mobile: Joi.string().required().messages({
        'any.required': '"Mobile" is required',
        'string.empty': '"Mobile" cannot be an empty field'
    }),

    Password: Joi.string().required().messages({
        'any.required': '"Password" is required',
        'string.empty': '"Password" cannot be an empty field'
    })
});

module.exports = { userCredentialsJoi };
