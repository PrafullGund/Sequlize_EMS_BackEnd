const db = require('../config/db.config');
const { admissionsJoi } = require('../helpers/admissionsJoi');

const postAdmissionController = async (req, res) => {
    const { error, value } = admissionsJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        const admission = await db.admissions.create(value);
        res.send(admission);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Admission'
        });
    }
};

const getAllAdmissionsController = async (req, res) => {
    try {
        const admissions = await db.admissions.findAll();
        res.send(admissions);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving admissions'
        });
    }
};

const getAdmissionByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const admission = await db.admissions.findByPk(id);
        if (!admission) {
            return res.status(404).send({
                message: `Admission with id ${id} not found`
            });
        }
        res.send(admission);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the admission'
        });
    }
};

const updateAdmissionController = async (req, res) => {
    const id = req.params.id;
    const { error, value } = admissionsJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        const [updated] = await db.admissions.update(value, {
            where: { Id: id }
        });
        if (updated) {
            const updatedAdmission = await Admissions.findByPk(id);
            return res.send(updatedAdmission);
        }
        throw new Error('Admission not found');
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while updating the admission'
        });
    }
};

const deleteAdmissionController = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db.admissions.destroy({
            where: { Id: id }
        });
        if (deleted) {
            return res.send({
                message: 'Admission deleted successfully'
            });
        }
        throw new Error('Admission not found');
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting the admission'
        });
    }
};

module.exports = {
    postAdmissionController,
    getAllAdmissionsController,
    getAdmissionByIdController,
    updateAdmissionController,
    deleteAdmissionController
};