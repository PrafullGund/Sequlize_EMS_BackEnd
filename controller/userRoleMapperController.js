const db=require('../config/db.config');
const {userRoleMapperJoi}=require('../helpers/userRoleMapperJoi');

const postUserRoleMapperController=async(req,res)=>{
    const{error,value}=userRoleMapperJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{UserId,RoleId}=value
    try{
        const userRole=await db.userRoleMapper.create({
            UserId,
            RoleId
        })
        res.status(201).send(userRole);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const getAllUserRoleMapperController=async(req,res)=>{
    const userRole=await db.userRoleMapper.findAll();
    res.send(userRole);
}

const getByIdUserRoleMapperController=async(req,res)=>{
    const{id}=req.params;
    try{
        const userRole=await db.userRoleMapper.findByPk(id);
        if(!userRole){
            return res.status(404).send({
                message: `User role  with id=${id} not found.`,
            });
        }
        res.send(userRole);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateUserRoleMapperController=async(req,res)=>{
    const {error,value}=userRoleMapperJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {id}=req.params;
    const{UserId,RoleId}=value;
    try{
        const userRole=await db.userRoleMapper.findByPk(id);
        if (!userRole) {
            return res.status(404).send({
                message: `userRole with id ${id} not found.`,
            });
        }
        userRole.UserId=UserId;
        userRole.RoleId=RoleId;

        await userRole.save();
        res.send(userRole);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const deleteUserRoleMapperController=async (req,res)=>{
    const {id}=req.params;
    
    try{
        const userRole=await db.userRoleMapper.findByPk(id);
        if(!userRole){
            return res.status(400).send({
                message: `userRole with id ${id} not found.`
            })
        }
        await userRole.destroy();
        res.send({
            message:`User role mapper with id ${id} was deleted successfully`
        })
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

module.exports={
    postUserRoleMapperController,
    getAllUserRoleMapperController,
    getByIdUserRoleMapperController,
    updateUserRoleMapperController,
    deleteUserRoleMapperController
}