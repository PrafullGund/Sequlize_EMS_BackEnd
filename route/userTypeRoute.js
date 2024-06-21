const express = require('express');
const router = express.Router();
const userTypeController = require('../controller/userTypeController');

router.post('/', userTypeController.postUserTypeController);
router.get('/', userTypeController.getAllUserTypeController);
router.get('/:id', userTypeController.getByIdUserTypeController);
router.put('/updateUserType/:id', userTypeController.updateUserTypeController);
router.delete('/deleteUserType/:id', userTypeController.deleteUserTypeController);

module.exports = router