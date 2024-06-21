const Joi = require('joi');

const featuresJoi = Joi.object({
    Name: Joi.string().required().messages({
        'any.required': '"Name" is required',
        'string.empty': '"Name" cannot be an empty field'
    }),
    Description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
    RoleId: Joi.number().required().messages({
        'any.required': '"RoleId" is required',
        'number.base': '"RoleId" must be a number'
    }),
});

module.exports = { featuresJoi };
