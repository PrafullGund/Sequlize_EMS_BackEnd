const Joi = require('joi');

const subjectJoi = Joi.object({
    SubjectName: Joi.string().required().messages({
        'any.required': '"SubjectName" is required',
        'string.empty': '"SubjectName" cannot be an empty field'
    }),
    Description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
})

module.exports = { subjectJoi };