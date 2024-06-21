const Joi = require('joi');

const admissionsJoi = Joi.object({
    EnquiryId: Joi.number().integer().required().messages({
        'number.base': 'EnquiryId must be a number',
        'number.integer': 'EnquiryId must be an integer',
        'any.required': 'EnquiryId is required'
    }),
    AdmissionDate: Joi.date().required().messages({
        'date.base': 'AdmissionDate must be a valid date',
        'any.required': 'AdmissionDate is required'
    }),
    Description: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Description must be a string'
    }),
    Status: Joi.string().valid('completed', 'on going').required().messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be either completed or on going',
        'any.required': 'Status is required'
    })
});

module.exports = { admissionsJoi };
