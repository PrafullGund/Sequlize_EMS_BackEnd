const express = require('express');
const router = express.Router();
const communicationLogController=require('../controller/communicationLogController');

router.post('/',communicationLogController.postCommunicationLogController);
router.get('/',communicationLogController.getAllCommunicationLogController);
router.get('/:id',communicationLogController.getCommunicationLogByIdController);
router.put('/updateCommunicationLog/:id',communicationLogController.updateCommunicationController);
router.delete('/deleteCommunicationLog/:id',communicationLogController.deleteCommunicationLogController);

module.exports = router;