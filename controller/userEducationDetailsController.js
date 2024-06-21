const db=require('../config/db.config');
const {userEducationDetailsJoi}=require('../helpers/userEducationDetailsJoi');

const postUserEducationDetailsController=async(req,res)=>{
    const{error,value}=userEducationDetailsJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{UserId, EducationTitle, Description, PassingYear}=value;
    try{
        const educationDetails=await db.userEducationDetails.create({
            UserId,
            EducationTitle,
            Description,
            PassingYear
        })
        res.status(201).send(educationDetails);

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the user'
        })
    }
}

const getAllUserEducationDetailsController=async(req,res)=>{
    const educationDetails=await db.userEducationDetails.findAll();
    res.send(educationDetails);
}

const getByIdUserEducationDetailsController=async(req,res)=>{
    const {id}=req.params;
    try{
        const educationDetails=await db.userEducationDetails.findByPk(id);
        if(!educationDetails){
            return res.status(404).send({
                message:`user with id=${id} not found`
            })
        };
        res.send(educationDetails);
    }catch(error){
        res.status(500).send({
            message:error.message || 'Some error occurred while updating the User'
        })
    }
}

const updateUserEducationDetailsController=async(req,res)=>{
    const{error,value}=userEducationDetailsJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {id}=req.params;
    const{UserId,EducationTitle,Description,PassingYear}=value
    try{
        const educationDetails=await db.userEducationDetails.findByPk(id);
        if(!educationDetails){
            return res.status(404).send({
                message:`User with id ${id} not found`
            })
        }
        educationDetails.UserId=UserId;
        educationDetails.EducationTitle=EducationTitle;
        educationDetails.Description=Description;
        educationDetails.PassingYear=PassingYear;

        await educationDetails.save();
        res.send(educationDetails);

    }catch(error){
        res.status(500).send({
            message:error.message || 'Some error occurred while updating the User'
        })
    }
}

const deleteUserEducationDetailsController=async (req,res)=>{
    const {id}=req.params;

    try{
        const educationDetails=await db.userEducationDetails.findByPk(id);
            if(!educationDetails){
                return res.status(404).send({
                    message:`User with id ${id} not found`,
                });
            }
            await educationDetails.destroy();
            res.send({
                message: `User Education Details with id ${id} was deleted successfully.`,
            })
        
    }catch(error){
        res.status(500).send({
            message:error.message || 'save error occurred while deleting the user'
        })
    }
}

module.exports={
    postUserEducationDetailsController,
    getAllUserEducationDetailsController,
    getByIdUserEducationDetailsController,
    updateUserEducationDetailsController,
    deleteUserEducationDetailsController
}