const express=require('express');
const router=express.Router();
const pipeLinePhasesController=require('../controller/pipeLinePhasesController');

router.post('/',pipeLinePhasesController.postPipeLinePhasesController);
router.get('/',pipeLinePhasesController.getAllPipeLinePhasesController);
router.get('/:id',pipeLinePhasesController.getByIdPipeLinePhasesController);
router.put('/updatePipeLinePhases/:id',pipeLinePhasesController.updatePipeLinePhasesController);
router.delete('/deletePipeLinePhases/:id',pipeLinePhasesController.deletePipeLinePhasesController);

module.exports=router;