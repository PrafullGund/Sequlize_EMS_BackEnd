const express=require('express');
const router=express.Router();
const activityStatusController=require('../controller/activityStatusController');

router.post('/',activityStatusController.postactivityStatusController);
router.get('/',activityStatusController.getAllActivityStatusController);
router.get('/:id',activityStatusController.getByIdActivityStatusController);
router.put('/updateActivityStatus/:id',activityStatusController.updateActivityStatusController);
router.delete('/deleteActivityStatus/:id',activityStatusController.deleteActivityStatusController);

module.exports=router