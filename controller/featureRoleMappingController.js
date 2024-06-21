const db = require('../config/db.config');
const { featureRoleMappingJoi } = require('../helpers/featureRoleMappingJoi');

const postFeaturesRoleMappingController = async (req, res) => {
    const { error, value } = featureRoleMappingJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { FeatureId, RoleId } = value;
    try {
        const mapping = await db.featureRoleMapping.create({
            FeaturesId: FeatureId,
            RoleId
        });
        res.status(201).send(mapping);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
};

const getAllFeatureRoleMappingController=async(req,res)=>{
    const mapping=await db.featureRoleMapping.findAll();
    res.status(200).send(mapping);
}

const getByIdFeatureRoleMappingController=async(req,res)=>{
    const {id}=req.params;
    try{
        const mapper=await db.featureRoleMapping.findByPk(id);
        if(!mapper){
            return res.status(404).send({
                message:`features with id=${id} not found`
            })
        }
        res.send(mapper);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updateFeatureRoleMappingController=async(req,res)=>{
    const {error,value}=featureRoleMappingJoi.validate(req.body);
    if(error){
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const{FeatureId, RoleId}=value;
    const{id}=req.params;
    try{
        const mapping=await db.featureRoleMapping.findByPk(id);
        if(!mapping){
            return res.status(404).send({
                message:`mapping with id=${id} not found`
            })
        }
        mapping.FeatureId=FeatureId;
        mapping.RoleId=RoleId;

        await mapping.save();
        res.send(mapping);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const deleteFeatureRoleMappingController=async(req,res)=>{
    const {id}=req.params;

    try{
        const mapping=await db.featureRoleMapping.findByPk(id);
        if(!mapping){
            return res.status(404).send({
                message:`mapping with id=${id} not found`
            })
        }
        await mapping.destroy();
        res.send({
            message:`Feature Role Mapping with ${id} was deleted successfully`
        })

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

module.exports = { 
    postFeaturesRoleMappingController,
    getAllFeatureRoleMappingController,
    getByIdFeatureRoleMappingController,
    updateFeatureRoleMappingController,
    deleteFeatureRoleMappingController
};
