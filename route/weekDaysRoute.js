const express = require('express');
const router = express.Router();
const weekDaysController=require('../controller/weekDaysController');

router.post('/',weekDaysController.postWeekDaysController);
router.get('/',weekDaysController.getAllWeekDaysController);
router.get('/:id',weekDaysController.getByIdWeekDaysController);
router.put('/updateWeekDays/:id',weekDaysController.updateWeekDaysController);
router.delete('/deleteWeekDays/:id',weekDaysController.deleteWeekDaysController);

module.exports = router