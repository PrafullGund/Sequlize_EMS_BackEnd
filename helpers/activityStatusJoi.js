const Joi=require('joi');

const activityStatusJoi=Joi.object({
    StatusName:Joi.string().required().messages({
        'any.required': '"StatusName" is required',
        'string.empty': '"StatusName" cannot be an empty field'
    })
})

module.exports={activityStatusJoi};