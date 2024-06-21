const express=require('express');
const router=express.Router();
const syllabusController=require('../controller/syllabusController')

router.post('/',syllabusController.postSyllabusController);
router.get('/',syllabusController.getAllSyllabusController);
router.get('/:id',syllabusController.getSyllabusByIdController)
router.put('/updateSyllabus/:id',syllabusController.updateSyllabusController);
router.delete('/deleteSyllabus/:id',syllabusController.deleteSyllabusController);


module.exports = router;