const express = require('express');
const router = express.Router();
const timeTableController=require('../controller/timeTableController');

router.post('/',timeTableController.postTimeTableController);
router.get('/',timeTableController.getAllWeekDaysController);
router.get('/:id',timeTableController.getWeekDaysByIdController);
router.put('/updateTime/:id',timeTableController.updateTimeTableController);
router.delete('/deleteTime/:id',timeTableController.deleteTimeTableController);

module.exports = router