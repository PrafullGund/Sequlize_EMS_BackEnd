const db = require('../config/db.config');
const { feePaymentsJoi } = require('../helpers/feePaymentJoi');


const postFeePaymentController = async (req, res) => {
    const { error, value } = feePaymentsJoi.validate(req.body); // Ensure correct variable name
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        const feePayment = await db.feePayments.create(value);
        res.send(feePayment);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Fee Payment'
        });
    }
};

const getAllFeePaymentsController = async (req, res) => {
    try {
        const feePayments = await db.feePayments.findAll();
        res.send(feePayments);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving fee payments'
        });
    }
};

const getFeePaymentByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const feePayment = await db.feePayments.findByPk(id);
        if (!feePayment) {
            return res.status(404).send({
                message: `Fee Payment with id ${id} not found`
            });
        }
        res.send(feePayment);
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving the fee payment'
        });
    }
};

const updateFeePaymentController = async (req, res) => {
    const id = req.params.id;
    const { error, value } = feePaymentsJoi.validate(req.body); // Ensure correct variable name
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        const [updated] = await db.feePayments.update(value, {
            where: { Id: id }
        });
        if (updated) {
            const updatedFeePayment = await FeePayments.findByPk(id);
            return res.send(updatedFeePayment);
        }
        throw new Error('Fee Payment not found');
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while updating the fee payment'
        });
    }
};

const deleteFeePaymentController = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db.feePayments.destroy({
            where: { Id: id }
        });
        if (deleted) {
            return res.send({
                message: 'Fee Payment deleted successfully'
            });
        }
        throw new Error('Fee Payment not found');
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting the fee payment'
        });
    }
};

module.exports = {
    postFeePaymentController,
    getAllFeePaymentsController,
    getFeePaymentByIdController,
    updateFeePaymentController,
    deleteFeePaymentController
};
