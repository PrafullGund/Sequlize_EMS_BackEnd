const db=require('../config/db.config');
const {activityTypeJoi}=require('../helpers/activityTypeJoi');

const postActivityTypeController=async (req,res)=>{
    const {error,value}=activityTypeJoi.validate(req.body);
    if(error){
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {TypeName}=value
    try{
        const type=await db.activityTypes.create({
            TypeName:TypeName
        });
        res.status(201).send(type)

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const getAllActivityTypeController=async(req,res)=>{
    const type=await db.activityTypes.findAll();
    res.status(200).send(type);
}

const getByIdActivityTypeController=async(req,res)=>{
    const {id}=req.params;
    try{
        const type=await db.activityTypes.findByPk(id);
        if(!type){
            return res.status(404).send({
                message:`features with id=${id} not found`
            })
        }
        res.send(type);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updateActivityTypeController = async (req, res) => {
    const { error, value } = activityTypeJoi.validate(req.body);
    
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { id } = req.params;
    const { TypeName } = value;

    try {
        const type = await db.activityTypes.findByPk(id);
        if (!type) {
            return res.status(404).send({
                message: `Activity Type with id=${id} not found`
            });
        }

        type.TypeName = TypeName;
        await type.save();
        res.send(type);

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the Activity Type'
        });
    }
};

const deleteActivityTypeController=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const type=await db.activityTypes.findByPk(id);
        if(!type){
            return res.status(404).send({
                message:`type with id=${id} not found`
            })
        }
        await type.destroy();
        res.send({
            message:`Activity Type with ${id} was deleted successfully`
        })

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}
module.exports={
    postActivityTypeController,
    getAllActivityTypeController,
    getByIdActivityTypeController,
    updateActivityTypeController,
    deleteActivityTypeController
}