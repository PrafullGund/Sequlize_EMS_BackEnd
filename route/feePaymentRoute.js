const express = require('express');
const router = express.Router();
const feePaymentController=require('../controller/feePaymentsController');

router.post('/',feePaymentController.postFeePaymentController);
router.get('/',feePaymentController.getAllFeePaymentsController);
router.get('/:id',feePaymentController.getFeePaymentByIdController);
router.put('/updateFeePayment/:id',feePaymentController.updateFeePaymentController);
router.delete('/deleteFeePayment/:id',feePaymentController.deleteFeePaymentController);

module.exports = router;