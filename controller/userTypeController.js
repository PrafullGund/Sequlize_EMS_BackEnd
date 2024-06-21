const db = require('../config/db.config');
const { userTypeJoi } = require('../helpers/userTypeJoi');

const postUserTypeController = async (req, res) => {
    const { error, value } = userTypeJoi.validate(req.body);

    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
        });
    }

    const { UserTypeName, UserTypeDescription } = value;
    try {
        const data = await db.userTypes.create({
            UserTypeName: UserTypeName,
            UserTypeDescription: UserTypeDescription,
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the UserType.',
        });
    }
};

const getAllUserTypeController = async (req, res) => {
    try {
        const data = await db.userTypes.findAll();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Wrong Query'
        });
    }
};

const getByIdUserTypeController = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await db.userTypes.findByPk(id)

        if (!data) {
            return res.status(404).send({
                message: `UserType with id=${id} not found.`,
            });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateUserTypeController = async (req, res) => {
    const { error, value } = userTypeJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
        });
    }
    const { id } = req.params;
    const { UserTypeName, UserTypeDescription } = value;

    try {
        const userType = await db.userTypes.findByPk(id);
        if (!userType) {
            return res.status(404).send({
                message: `UserType with id ${id} not found.`,
            });
        }
        userType.UserTypeName = UserTypeName;
        userType.UserTypeDescription = UserTypeDescription;
        await userType.save();
        res.send(userType);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while updating the UserType.',
        });
    }
};

const deleteUserTypeController = async (req, res) => {
    const { id } = req.params;

    try {
        const userType = await db.userTypes.findByPk(id);
        if (!userType) {
            return res.status(404).send({
                message: `UserType with id ${id} not found.`,
            });
        }
        await userType.destroy();
        res.send({
            message: `UserType with id ${id} was deleted successfully.`,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting the UserType.',
        });
    }
};

module.exports = {
    postUserTypeController,
    getAllUserTypeController,
    getByIdUserTypeController,
    updateUserTypeController,
    deleteUserTypeController
};