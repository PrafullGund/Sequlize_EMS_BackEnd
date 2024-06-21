const Joi = require('joi');

const activitiesJoi = Joi.object({
    ActivityTypeId: Joi.number().integer().required().messages({
        'any.required': '"ActivityTypeId" is required',
        'number.base': '"ActivityTypeId" must be a number'
    }),
    ActivityStatusId: Joi.number().integer().required().messages({
        'any.required': '"ActivityStatusId" is required',
        'number.base': '"ActivityStatusId" must be a number'
    }),
    DueDate: Joi.date().required().messages({
        'any.required': '"DueDate" is required',
        'date.base': '"DueDate" must be a valid date'
    }),
    SalesRepresentativeId: Joi.number().integer().required().messages({
        'any.required': '"SalesRepresentativeId" is required',
        'number.base': '"SalesRepresentativeId" must be a number'
    }),
    Summary: Joi.string().required().messages({
        'any.required': '"Summary" is required'
    })
});

module.exports = { activitiesJoi };
