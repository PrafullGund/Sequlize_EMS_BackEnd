const express=require('express');
const router=express.Router();
const userEducationDetailsController=require('../controller/userEducationDetailsController');

router.post('/',userEducationDetailsController.postUserEducationDetailsController);
router.get('/',userEducationDetailsController.getAllUserEducationDetailsController);
router.get('/:id',userEducationDetailsController.getByIdUserEducationDetailsController);
router.put('/updateEducationDetails/:id',userEducationDetailsController.updateUserEducationDetailsController);
router.delete('/deleteUserEducationDetails/:id',userEducationDetailsController.deleteUserEducationDetailsController);

module.exports = router;