const Joi = require('joi');

const courseJoi = Joi.object({
    CourseName: Joi.string().required().messages({
        'any.required': '"CourseName" is required',
        'string.empty': '"CourseName" cannot be an empty field'
    }),
    Description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
    CourseFees: Joi.number().required().messages({
        'any.required': '"CourseFees" is required', 
        'string.empty': '"CourseFees" cannot be an empty field'
    }),
    CourseDuration: Joi.number().required().messages({
        'any.required': '"CourseDuration" is required',
        'string.empty': '"CourseDuration" cannot be an empty field'
    }),
    CourseTypeId: Joi.number().required().messages({
        'any.required': '"CourseTypeId" is required',
        'string.empty': '"CourseTypeId" cannot be an empty field'
    })
});

module.exports = { courseJoi };