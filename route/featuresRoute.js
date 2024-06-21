const express=require('express');
const router=express.Router();
const featuresController=require('../controller/featuresController');

router.post('/',featuresController.postfeaturesController);
router.get('/',featuresController.getAllFeaturesController);
router.get('/:id',featuresController.getByIdFeaturesController);
router.put('/updateFeatures/:id',featuresController.updateFeaturesController);
router.delete('/deleteFeatures/:id',featuresController.deleteFeaturesController);

module.exports = router;