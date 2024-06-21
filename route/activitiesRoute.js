const express=require('express');
const router=express.Router();
const activitiesController=require('../controller/activitiesController');

router.post('/',activitiesController.postActivitiesController);
router.get('/',activitiesController.getAllActivitiesController);
router.get('/:id',activitiesController.getByIdActivitiesController);
router.put('/updateActivities/:id',activitiesController.updateActivitiesController);
router.delete('/deleteActivities/:id',activitiesController.deleteActivitiesController);

module.exports=router;