const express=require('express');
const router=express.Router();
const activityTypeContoller=require('../controller/activityTypeController');

router.post('/',activityTypeContoller.postActivityTypeController);
router.get('/',activityTypeContoller.getAllActivityTypeController);
router.get('/:id',activityTypeContoller.getByIdActivityTypeController);
router.put('/updateActivityType/:id',activityTypeContoller.updateActivityTypeController);
router.delete('/deleteActivityType/:id',activityTypeContoller.deleteActivityTypeController);

module.exports=router