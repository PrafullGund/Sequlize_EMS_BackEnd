const express=require('express');
const router=express.Router();
const userAddressController=require('../controller/userAddressController');

router.post('/',userAddressController.postUserAddressController);
router.get('/',userAddressController.getAllUserAddressController);
router.get('/:id',userAddressController.getByIdUserAddressController);
router.put('/updateAddress/:id',userAddressController.updateUserAddressController);
router.delete('/deleteAddress/:id',userAddressController.deleteUserAddressController)

module.exports = router;