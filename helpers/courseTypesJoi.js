const Joi = require('joi');

const courseTypeJoi = Joi.object({
    TypeName: Joi.string().required().messages({
        'any.required': '"Name" is required',
        'string.empty': '"Name" cannot be an empty field'
    }),
    Description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
})

module.exports = { courseTypeJoi };