const Joi = require('joi');

const userJoi = Joi.object({
    FirstName: Joi.string().required().messages({
        'any.required': '"FirstName" is required',
        'string.empty': '"FirstName" cannot be an empty field'
    }),
    LastName: Joi.string().required().messages({
        'any.required': '"LastName" is required',
        'string.empty': '"LastName" cannot be an empty field'
    }),
    DOB: Joi.date().iso().required().messages({
        'any.required': '"DOB" is required',
        'date.format': '"DOB" must be in ISO format'
    }),
    UserTypeId: Joi.number().required().messages({
        'any.required': '"UserTypeId" is required',
        'number.base': '"UserTypeId" must be a number'
    }),
    Email: Joi.string().email().required().messages({
        'any.required': '"Email" is required',
        'string.email': '"Email" must be a valid email'
    }),
    Mobile: Joi.string().required().messages({
        'any.required': '"Mobile" is required',
        'string.empty': '"Mobile" cannot be an empty field'
    }),
    Password: Joi.string().required().messages({
        'any.required': '"Password" is required',
        'string.empty': '"Password" cannot be an empty field'
    }),
    AddressLineOne: Joi.string().required().messages({
        'any.required': '"AddressLineOne" is required',
        'string.empty': '"AddressLineOne" cannot be an empty field'
    }),
    AddressLineTwo: Joi.string().required().messages({
        'any.required': '"AddressLineTwo" is required',
        'string.empty': '"AddressLineTwo" cannot be an empty field'
    }),
    Country: Joi.string().required().messages({
        'any.required': '"Country" is required',
        'string.empty': '"Country" cannot be an empty field'
    }),
    State: Joi.string().required().messages({
        'any.required': '"State" is required',
        'string.empty': '"State" cannot be an empty field'
    }),
    City: Joi.string().required().messages({
        'any.required': '"City" is required',
        'string.empty': '"City" cannot be an empty field'
    }),
    PostalCode: Joi.string().required().messages({
        'any.required': '"PostalCode" is required',
        'string.empty': '"PostalCode" cannot be an empty field'
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
    }),
    RoleId: Joi.number().required().messages({
        'any.required': '"RoleId" is required',
        'number.base': '"RoleId" must be a number'
    }),
});

module.exports = { userJoi };
