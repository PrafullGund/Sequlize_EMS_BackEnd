const Joi = require('joi');

const userTypeJoi = Joi.object({
    UserTypeName: Joi.string().required().messages({
        'any.required': 'UserTypeName is required',
        'string.empty': 'UserTypeName cannot be empty',
    }),
    UserTypeDescription: Joi.string().allow(null, '').messages({
        'string.empty': 'UserTypeDescription cannot be empty',
    }),
});

module.exports = { userTypeJoi };
