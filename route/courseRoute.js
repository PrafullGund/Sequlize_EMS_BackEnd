const express=require('express');
const router=express.Router();
const courseController=require('../controller/courseController');

router.post('/',courseController.postCourseController);
router.get('/',courseController.getAllCourseController);
router.get('/:id',courseController.getByIdCourseController);
router.put('/updateCourse/:id',courseController.updateCourseController);
router.delete('/deleteCourse/:id',courseController.deleteCourseController);

module.exports=router