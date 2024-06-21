const Joi=require('joi');

const timeTableJoi=Joi.object({
    FacultyId:Joi.number().integer().required().messages({
        'any.required': 'FacultyId is required.',
        'number.base': 'FacultyId must be a number.'
      }),
    SyllabusId:Joi.number().integer().required().messages({
        'any.required': 'SyllabusId is required.',
        'number.base': 'SyllabusId must be a number.'
      }),
    WeekDayId: Joi.number().integer().required().messages({
        'any.required': 'WeekDayId is required.',
        'number.base': 'WeekDayId must be a number.'
      }),
    SlotStartTime: Joi.string().required().messages({
        'any.required': 'SlotStartTime is required.',
        'string.base': 'SlotStartTime must be a string.'
      }),
    SlotEndTime: Joi.string().required().messages({
        'any.required': 'SlotEndTime is required.',
        'string.base': 'SlotEndTime must be a string.'
      })
})
module.exports = { timeTableJoi };