const db=require('../config/db.config');
const {weekDaysJoi}=require('../helpers/weekDaysJoi');

const postWeekDaysController=async (req,res)=>{
    const {error,value}=weekDaysJoi.validate(req.body);
    if(error){
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {Name}=value;
    try{
        const week=await db.weekDays.create({
            Name:Name
        });
        res.send(week)
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const getAllWeekDaysController=async(req,res)=>{
    const week=await db.weekDays.findAll();
    res.status(200).send(week);
}

const getByIdWeekDaysController=async(req,res)=>{
    const {id}=req.params;
    try{
        const week=await db.weekDays.findByPk(id);
        if(!type){
            return res.status(404).send({
                message:`week with id=${id} not found`
            })
        }
        res.send(week);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updateWeekDaysController = async (req, res) => {
    const { error, value } = weekDaysJoi.validate(req.body);
    
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { id } = req.params;
    const { Name } = value;

    try {
        const week = await db.weekDays.findByPk(id);
        if (!week) {
            return res.status(404).send({
                message: `week with id=${id} not found`
            });
        }

        week.Name = Name;
        await week.save();
        res.send(week);

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the Activity Type'
        });
    }
};

const deleteWeekDaysController=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const week=await db.weekDays.findByPk(id);
        if(!week){
            return res.status(404).send({
                message:`week with id=${id} not found`
            })
        }
        await week.destroy();
        res.send({
            message:`week with ${id} was deleted successfully`
        })

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

module.exports={
    postWeekDaysController,
    getAllWeekDaysController,
    getByIdWeekDaysController,
    updateWeekDaysController,
    deleteWeekDaysController
}