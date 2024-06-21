const Joi = require('joi');

const userAddressJoi = Joi.object({
    UserId: Joi.number().required().messages({
        'any.required': '"UserId" is required',
        'number.base': '"UserId" must be a number'
    }),
    AddressLineOne: Joi.string().optional(),
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
    })
});

module.exports = { userAddressJoi };
