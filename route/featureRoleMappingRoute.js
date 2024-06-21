const express=require('express');
const router=express.Router();
const featureRoleMappingController=require('../controller/featureRoleMappingController');

router.post('/',featureRoleMappingController.postFeaturesRoleMappingController);
router.get('/',featureRoleMappingController.getAllFeatureRoleMappingController);
router.get('/:id',featureRoleMappingController.getByIdFeatureRoleMappingController);
router.put('/updateFeatureRole/:id',featureRoleMappingController.updateFeatureRoleMappingController);
router.delete('/deleteFeatureRole/:id',featureRoleMappingController.deleteFeatureRoleMappingController);

module.exports=router