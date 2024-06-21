const express=require('express');
const router=express.Router();
const roleController=require('../controller/roleController');

router.post('/',roleController.postRoleController);
router.get('/',roleController.getAllRoleController);
router.get('/:id',roleController.getByIdRoleController);
router.put('/updateRole/:id',roleController.updateRoleController);
router.delete('/deleteRole/:id',roleController.deleteRoleController);

module.exports = router;