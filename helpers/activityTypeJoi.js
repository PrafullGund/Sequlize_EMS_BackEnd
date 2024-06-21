const Joi=require('joi');

const activityTypeJoi=Joi.object({
    TypeName:Joi.string().required().messages({
        'any.required': '"ActivityType" is required',
        'string.empty': '"ActivityType" cannot be an empty field'
    })
})

module.exports={activityTypeJoi};