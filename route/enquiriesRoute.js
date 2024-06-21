const express=require('express');
const router=express.Router();
const enquiriesController=require('../controller/enquiriesController');

router.post('/',enquiriesController.postEnquiriesController);
router.get('/',enquiriesController.getAllEnquiriesController);
router.get('/:id',enquiriesController.getEnquiryByIdController);
router.put('/updateEnquiries/:id',enquiriesController.updateEnquiryController);
router.delete('/deleteEnquiries/:id',enquiriesController.deleteEnquiryController);

module.exports=router;