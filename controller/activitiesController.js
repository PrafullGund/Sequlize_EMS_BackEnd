const db = require('../config/db.config');
const { activitiesJoi } = require('../helpers/activitiesJoi');

const postActivitiesController = async (req, res) => {
    const { error, value } = activitiesJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { ActivityTypeId, ActivityStatusId, DueDate, SalesRepresentativeId, Summary } = value;

    try {
        const activities = await db.activities.create({
            ActivityTypeId,
            ActivityStatusId,
            DueDate,
            SalesRepresentativeId,
            Summary
        });
        res.status(201).send(activities);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Activity'
        });
    }
};

const getAllActivitiesController = async (req, res) => {
    const activities = await db.activities.findAll();
    res.status(200).send(activities);
}

const getByIdActivitiesController = async (req, res) => {
    const { id } = req.params;
    try {
        const activities = await db.activities.findByPk(id);
        if (!activities) {
            return res.status(404).send({
                message: `activities with id=${id} not found`
            })
        }
        res.send(activities);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updateActivitiesController = async (req, res) => {
    const { error, value } = activitiesJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { id } = req.params;
    const { ActivityTypeId, ActivityStatusId, DueDate, SalesRepresentativeId, Summary } = value;
    try {
        const activities = await db.activities.findByPk(id);
        if (!activities) {
            return res.status(404).send({
                message: `activities with id=${id} not found`
            })
        }
        activities.ActivityTypeId = ActivityTypeId;
        activities.ActivityStatusId = ActivityStatusId;
        activities.DueDate = DueDate;
        activities.SalesRepresentativeId = SalesRepresentativeId;
        activities.Summary = Summary;

        await activities.save();
        res.send(activities);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const deleteActivitiesController = async (req, res) => {
    const { id } = req.params;
    try {
        const activities = await db.activities.findByPk(id);
        await activities.destroy();
        res.send({
            message: `activities with ${id} was deleted successfully`
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

module.exports = {
    postActivitiesController,
    getAllActivitiesController,
    getByIdActivitiesController,
    updateActivitiesController,
    deleteActivitiesController
}