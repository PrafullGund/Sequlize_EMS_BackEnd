const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');

router.post('/',userController.postUserController);
router.get('/',userController.getAllUserController);
router.get('/:id',userController.getByIdUserController);
router.put('/updateUser/:id',userController.updateUserController);
router.delete('/deleteUser/:id',userController.deleteUserController);

module.exports=router;