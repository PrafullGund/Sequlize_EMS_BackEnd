const express=require('express');
const router=express.Router();
const userRoleMapperController=require('../controller/userRoleMapperController');

router.post('/',userRoleMapperController.postUserRoleMapperController);
router.get('/',userRoleMapperController.getAllUserRoleMapperController);
router.get('/:id',userRoleMapperController.getByIdUserRoleMapperController);
router.put('/updateUserRoleMapper/:id',userRoleMapperController.updateUserRoleMapperController);
router.delete('/deleteUserRoleMapper/:id',userRoleMapperController.deleteUserRoleMapperController);

module.exports=router;