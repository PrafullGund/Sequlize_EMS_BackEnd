const Joi=require('joi');

const pipeLinePhasesJoi=Joi.object({
    PhaseName:Joi.string().required().messages({
        'any.required': '"PhaseName" is required',
        'string.empty': '"PhaseName" cannot be an empty field'
    })
})

module.exports={pipeLinePhasesJoi};