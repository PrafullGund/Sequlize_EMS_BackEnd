const db=require('../config/db.config');
const {userAddressJoi}=require('../helpers/userAdressesJoi');
// const { param } = require('../route/userAddressRoute');

const postUserAddressController=async(req,res)=>{
    const { error, value } = userAddressJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{UserId, AddressLineOne,AddressLineTwo,Country,State,City,PostalCode}=value
    try{
        const address=await db.userAddresses.create({
            UserId,
            AddressLineOne,
            AddressLineTwo,
            Country,
            State,
            City,
            PostalCode
        })
        res.status(201).send(address);

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        })
    }
}

const getAllUserAddressController=async(req,res)=>{
    const address=await db.userAddresses.findAll();
    res.send(address);
}

const getByIdUserAddressController=async(req,res)=>{
    const {id}=req.params;
    try{
        const address=await db.userAddresses.findByPk(id);
        if(!address){
            return res.status(404).send({
                message:`user with id=${id} not found`
            })
        };
        res.send(address);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateUserAddressController=async (req,res)=>{
    const{error,value}=userAddressJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {id}=req.params;
    const{UserId, AddressLineOne, AddressLineTwo, Country, State, City, PostalCode }=value;
    const address= await db.userAddresses.findByPk(id);
    if(!address){
        return res.status(404).send({
            message:`Address with id ${id} not found`
        })
    }
    address.UserId=UserId;
    address.AddressLineOne=AddressLineOne;
    address.AddressLineTwo=AddressLineTwo;
    address.Country=Country;
    address.State=State;
    address.City=City;
    address.PostalCode=PostalCode;

    await address.save();
    res.send(address);
}

const deleteUserAddressController=async (req,res)=>{
    const {id}=req.params;
    try{
        const address=await db.userAddresses.findByPk(id);
        if(!address){
            return res.status(404).send({
                message:`Address with id ${id} not found`
            })
        }
        await address.destroy();
        res.send({
            message: `User Address with id ${id} was deleted successfully.`,
        })
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

module.exports={
    postUserAddressController,
    getAllUserAddressController,
    getByIdUserAddressController,
    updateUserAddressController,
    deleteUserAddressController
}
