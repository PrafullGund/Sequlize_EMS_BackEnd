const db=require('../config/db.config');
const {subjectJoi}=require('../helpers/subjectJoi');

const postSubjectController = async (req, res) => {
    const { error, value } = subjectJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { SubjectName, Description } = value;

    try {
        const subject = await db.subject.create({
            SubjectName,
            Description
        });
        res.status(201).send(subject);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
};

const getAllSubjectController=async(req,res)=>{
    const subject=await db.subject.findAll();
    res.send(subject);
}

const getByIdSubjectController=async(req,res)=>{
    const {id}=req.params;
    try{
        const subject=await db.subject.findByPk(id);
        if(!subject){
            return res.status(404).send({
                message:`subject with id=${id} not found`
            })
        }
        res.send(subject);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateSubjectController=async (req,res)=>{
    const{error,value}=subjectJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const{SubjectName,Description}=value;
    try{
        const subject=await db.subject.findByPk(id);
        if(!subject){
            return res.status(404).send({
                message:`subject with id=${id} not found`
            })
        }
        subject.SubjectName=SubjectName;
        subject.Description=Description;

        await subject.save();
        res.send(subject);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const deleteSubjectController=async(req,res)=>{
    const {id}=req.params;
    try{
        const subject=await db.subject.findByPk(id);
        if(!subject){
            return res.status(404).send({
                message:`subject with id=${id} not found`
            })
        }
        await subject.destroy();
        res.send({
            message: `subject with id ${id} was deleted successfully.`,
        })
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

module.exports={
    postSubjectController,
    getAllSubjectController,
    getByIdSubjectController,
    updateSubjectController,
    deleteSubjectController
}