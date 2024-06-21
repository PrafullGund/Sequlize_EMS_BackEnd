const db = require('../config/db.config');
const { activityStatusJoi } = require('../helpers/activityStatusJoi');

const postactivityStatusController = async (req, res) => {
    const { error, value } = activityStatusJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { StatusName } = value
    try {
        const status = await db.activityStatus.create({
            StatusName: StatusName
        });
        res.status(201).send(status)

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const getAllActivityStatusController = async (req, res) => {
    const status = await db.activityStatus.findAll();
    res.status(200).send(status);
}

const getByIdActivityStatusController = async (req, res) => {
    const { id } = req.params;
    try {
        const status = await db.activityStatus.findByPk(id);
        if (!status) {
            return res.status(404).send({
                message: `status with id=${id} not found`
            })
        }
        res.send(status);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updateActivityStatusController = async (req, res) => {
    const { error, value } = activityStatusJoi.validate(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { id } = req.params;
    const { StatusName } = value;

    try {
        const status = await db.activityStatus.findByPk(id);
        if (!status) {
            return res.status(404).send({
                message: `status with id=${id} not found`
            });
        }

        status.StatusName = StatusName;
        await status.save();
        res.send(status);

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the Activity Type'
        });
    }
};

const deleteActivityStatusController = async (req, res) => {
    const { id } = req.params;

    try {
        const status = await db.activityStatus.findByPk(id);
        if (!status) {
            return res.status(404).send({
                message: `status with id=${id} not found`
            })
        }
        await status.destroy();
        res.send({
            message: `status with ${id} was deleted successfully`
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

module.exports = {
    postactivityStatusController,
    getAllActivityStatusController,
    getByIdActivityStatusController,
    updateActivityStatusController,
    deleteActivityStatusController
}