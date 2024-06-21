const Joi=require('joi');

const weekDaysJoi=Joi.object({
    Name:Joi.string().required().messages({
        'any.required': '"Name" is required',
        'string.empty': '"Name" cannot be an empty field'
    })
})

module.exports={weekDaysJoi};