const Joi = require('joi');

const enquiriesJoi = Joi.object({
    Name: Joi.string().required().messages({
        'any.required': '"Name" is required',
        'string.empty': '"Name" cannot be an empty field'
    }),
    Email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'any.required': '"Email" is required',
        'string.empty': '"Email" cannot be an empty field'
    }),
    Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'any.required': '"MobileNo" is required',
        'string.empty': '"MobileNo" cannot be an empty field'
    }),
    EnquirySource: Joi.string().required().messages({
        'any.required': '"EnquirySource" is required',
        'string.empty': '"EnquirySource" cannot be an empty field'
    }),
    CourseId: Joi.number().integer().positive().required().messages({
        'any.required': '"CourseId" is required',
        'number.base': '"CourseId" must be a number',
        'number.integer': '"CourseId" must be an integer',
        'number.positive': '"CourseId" must be a positive number',
        'string.empty': '"CourseId" cannot be an empty field'
    }),
    PipeLinePhaseId: Joi.number().integer().positive().required().messages({
        'any.required': '"PipeLinePhaseId" is required',
        'number.base': '"PipeLinePhaseId" must be a number',
        'number.integer': '"PipeLinePhaseId" must be an integer',
        'number.positive': '"PipeLinePhaseId" must be a positive number',
        'string.empty': '"PipeLinePhaseId" cannot be an empty field'
    }),
    SalesPersonId: Joi.number().integer().positive().required().messages({
        'any.required': '"SalesPersonId" is required',
        'number.base': '"SalesPersonId" must be a number',
        'number.integer': '"SalesPersonId" must be an integer',
        'number.positive': '"SalesPersonId" must be a positive number',
        'string.empty': '"SalesPersonId" cannot be an empty field'
    }),
});

module.exports = { enquiriesJoi };
