const express = require('express');
const router = express.Router();
const admissionController=require('../controller/admissionsController');

router.post('/',admissionController.postAdmissionController);
router.get('/',admissionController.getAllAdmissionsController);
router.get('/:id',admissionController.getAdmissionByIdController);
router.put('updateAdmission/:id',admissionController.updateAdmissionController);
router.delete('deleteAdmission/:id',admissionController.deleteAdmissionController);


module.exports = router;