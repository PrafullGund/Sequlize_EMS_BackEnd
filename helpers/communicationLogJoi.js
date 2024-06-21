const Joi = require('joi');

const communicationLogJoi = Joi.object({
    EnquiryId: Joi.number().integer().required().messages({
    'number.base': 'EnquiryId must be a number.',
    'number.integer': 'EnquiryId must be an integer.',
    'any.required': 'EnquiryId is required.'
  }),
  CustomerId: Joi.number().integer().required().messages({
    'number.base': 'CustomerId must be a number.',
    'number.integer': 'CustomerId must be an integer.',
    'any.required': 'CustomerId is required.'
  }),
  ActivityId: Joi.number().integer().required().messages({
    'number.base': 'ActivityId must be a number.',
    'number.integer': 'ActivityId must be an integer.',
    'any.required': 'ActivityId is required.'
  }),
  ActivityStatusId: Joi.number().integer().required().messages({
    'number.base': 'ActivityStatusId must be a number.',
    'number.integer': 'ActivityStatusId must be an integer.',
    'any.required': 'ActivityStatusId is required.'
  }),
  SalesRepresentativeId: Joi.number().integer().required().messages({
    'number.base': 'SalesRepresentativeId must be a number.',
    'number.integer': 'SalesRepresentativeId must be an integer.',
    'any.required': 'SalesRepresentativeId is required.'
  }),
  CommunicationDate: Joi.date().required().messages({
    'date.base': 'CommunicationDate must be a valid date.',
    'any.required': 'CommunicationDate is required.'
  }),
  CommunicationDetails: Joi.string().optional().allow(null, '').messages({
    'string.base': 'CommunicationDetails must be a string.'
  })
});

module.exports = { communicationLogJoi };
