const db=require('../config/db.config');
const {featuresJoi}=require('../helpers/featuresJoi');

const postfeaturesController = async (req, res) => {
    const { error, value } = featuresJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { Name, Description, RoleId } = value;

    try {
        const newFeature = await db.features.create({
            Name,
            Description
        });

        const newFeatureRoleMapping = await db.featureRoleMapping.create({
            FeaturesId: newFeature.Id, 
            RoleId
        });

        const data = {
            ...newFeature.toJSON(),
            RoleId: newFeatureRoleMapping.RoleId
        };

        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
};


const getAllFeaturesController=async(req,res)=>{
    const features=await db.features.findAll();
    res.send(features);
}

const getByIdFeaturesController=async(req,res)=>{
    const {id}=req.params;
    try{
        const features=await db.features.findByPk(id);
        if(!features){
            return res.status(404).send({
                message:`features with id=${id} not found`
            })
        }
        res.send(features);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateFeaturesController=async (req,res)=>{
    const{error,value}=featuresJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const{Name,Description}=value;
    try{
        const features=await db.features.findByPk(id);
        if(!features){
            return res.status(404).send({
                message:`features with id=${id} not found`
            })
        }
        features.Name=Name;
        features.Description=Description;

        await features.save();
        res.send(features);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const deleteFeaturesController=async(req,res)=>{
    const {id}=req.params;
    try{
        const features=await db.features.findByPk(id);
        if(!features){
            return res.status(404).send({
                message:`features with id=${id} not found`
            })
        }
        await features.destroy();
        res.send({
            message: `Features with id ${id} was deleted successfully.`,
        })
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

module.exports={
    postfeaturesController,
    getAllFeaturesController,
    getByIdFeaturesController,
    updateFeaturesController,
    deleteFeaturesController
}