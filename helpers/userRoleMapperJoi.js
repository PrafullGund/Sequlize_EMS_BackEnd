const Joi=require('joi');

const userRoleMapperJoi=Joi.object({
    UserId: Joi.number().required().messages({
        'any.required': '"UserId" is required',
        'number.base': '"UserId" must be a number'
    }),
    RoleId: Joi.number().required().messages({
        'any.required': '"RoleId" is required',
        'number.base': '"RoleId" must be a number'
    }),
})

module.exports = { userRoleMapperJoi };

