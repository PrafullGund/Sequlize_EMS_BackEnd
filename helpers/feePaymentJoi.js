const Joi = require('joi');

const feePaymentsJoi = Joi.object({
    AdmissionId: Joi.number().integer().required().messages({
        'number.base': 'AdmissionId must be a number',
        'number.integer': 'AdmissionId must be an integer',
        'any.required': 'AdmissionId is required'
    }),
    AmountCredited: Joi.number().required().messages({
        'number.base': 'AmountCredited must be a number',
        'any.required': 'AmountCredited is required'
    }),
    BalanceAmount: Joi.number().required().messages({
        'number.base': 'BalanceAmount must be a number',
        'any.required': 'BalanceAmount is required'
    }),
    PaymentDate: Joi.date().required().messages({
        'date.base': 'PaymentDate must be a valid date',
        'any.required': 'PaymentDate is required'
    }),
    PaymentMethod: Joi.string().valid('online', 'cash', 'UPI', 'card').required().messages({
        'string.base': 'PaymentMethod must be a string',
        'any.only': 'PaymentMethod must be one of [online, cash, UPI, card]',
        'any.required': 'PaymentMethod is required'
    }),
    NextDueDate: Joi.date().optional().allow(null).messages({
        'date.base': 'NextDueDate must be a valid date'
    })
});

module.exports = { feePaymentsJoi };
