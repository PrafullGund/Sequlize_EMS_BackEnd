const express=require('express');
const router=express.Router();
const courseTypeController=require('../controller/courseTypeController');

router.post('/',courseTypeController.postCourseTypeController);
router.get('/',courseTypeController.getAllCourseTypeController);
router.get('/:id',courseTypeController.getByIdCourseTypeController);
router.put('/updateCourseType/:id',courseTypeController.updateCourseTypeController);
router.delete('/deleteCourseType/:id',courseTypeController.deleteCourseTypeController);

module.exports = router;