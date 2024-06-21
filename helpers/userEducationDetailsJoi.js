const Joi = require('joi');

const userEducationDetailsJoi=Joi.object({
    UserId: Joi.number().required().messages({
        'any.required': '"UserId" is required',
        'number.base': '"UserId" must be a number'
    }),
    EducationTitle: Joi.string().required().messages({
        'any.required': '"EducationTitle" is required',
        'string.empty': '"EducationTitle" cannot be an empty field'
    }),
    Description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
    PassingYear: Joi.string().required().messages({
        'any.required': '"PassingYear" is required',
        'string.empty': '"PassingYear" cannot be an empty field'
    })
})

module.exports = { userEducationDetailsJoi };