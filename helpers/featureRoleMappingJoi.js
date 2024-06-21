const Joi = require('joi');

const featureRoleMappingJoi = Joi.object({
    FeatureId: Joi.number().required().messages({
        'any.required': '"FeatureId" is required',
        'number.base': '"FeatureId" must be a number'
    }),
    RoleId: Joi.number().required().messages({
        'any.required': '"RoleId" is required',
        'number.base': '"RoleId" must be a number'
    }),
});

module.exports = { featureRoleMappingJoi };
