const express=require('express');
const router=express.Router();
const userCredentialsController=require('../controller/userCredentialsController');

router.post('/',userCredentialsController.postUserCredentialsController);
router.get('/',userCredentialsController.getAllUserCredentialsController);
router.get('/:id',userCredentialsController.getByIdUserCredentialsController);
router.put('/updateUserCredentials/:id',userCredentialsController.updateUserCredentialsController);
router.delete('/deleteUserCredentials/:id',userCredentialsController.deleteUserCredentials);

module.exports = router;