const Joi = require('joi');

const syllabusJoi = Joi.object({
    SubjectId: Joi.number().integer().required().messages({
        'number.base': 'SubjectId must be a number',
        'number.integer': 'SubjectId must be an integer',
        'number.positive': 'SubjectId must be a positive integer',
        'any.required': 'SubjectId is required'
    }),
    SectionName: Joi.string().required().messages({
        'string.base': 'SectionName must be a string',
        'any.required': 'SectionName is required'
    }),
    TopicName: Joi.string().required().messages({
        'string.base': 'TopicName must be a string',
        'any.required': 'TopicName is required'
    }),
    CourseTypeId: Joi.number().integer().required().messages({
        'number.base': 'CourseTypeId must be a number',
        'number.integer': 'CourseTypeId must be an integer',
        'number.positive': 'CourseTypeId must be a positive integer',
        'any.required': 'CourseTypeId is required'
    })
});

module.exports = { syllabusJoi };
