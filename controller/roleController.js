const db = require('../config/db.config');
const { roleJoi } = require('../helpers/roleJoi');

const postRoleController = async (req, res) => {
    const { error, value } = roleJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { Name, Description } = value;
    try {
        const roles = await db.role.create({
            Name,
            Description
        });
        res.status(201).send(roles);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        });
    }
};

const getAllRoleController=async(req,res)=>{
    const roles=await db.role.findAll();
    res.send(roles);
}

const getByIdRoleController=async(req,res)=>{
    const {id}=req.params;

    try{
        const roles=await db.role.findByPk(id);
        if(!roles){
            return res.status(404).send({
                message:`user with id=${id} not found`
            })
        };
        res.send(roles);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        });
    }
}

const updateRoleController=async(req,res)=>{
    const {error,value}=roleJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const{Name,Description}=value;
    try{
        const roles=await db.role.findByPk(id);
        if(!roles){
            return res.status(404).send({
                message:`User with id ${id} not found`
            })
        }
        roles.Name=Name;
        roles.Description=Description;

        await roles.save();
        res.send(roles);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        });
    }
}

const deleteRoleController=async(req,res)=>{
    const{id}=req.params;

    try{
        const roles=await db.role.findByPk(id);
        if(!roles){
            return res.status(404).send({
                message:`Role with id ${id} not found`,
            });
        }
        await roles.destroy();
        res.send({
            message: `Role with id ${id} was deleted successfully.`,
        })
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        });
    }
}

module.exports = { 
    postRoleController,
    getAllRoleController,
    getByIdRoleController,
    updateRoleController,
    deleteRoleController
};
