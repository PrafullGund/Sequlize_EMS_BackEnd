const express=require('express');
const router=express.Router();
const subjectController=require('../controller/subjectController');

router.post('/',subjectController.postSubjectController);
router.get('/',subjectController.getAllSubjectController);
router.get('/:id',subjectController.getByIdSubjectController);
router.put('/updateSubject/:id',subjectController.updateSubjectController);
router.delete('/deleteSubject/:id',subjectController.deleteSubjectController);

module.exports = router;