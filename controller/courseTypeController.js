const db=require('../config/db.config');
const {courseTypeJoi}=require('../helpers/courseTypesJoi');

const postCourseTypeController = async (req, res) => {
    const { error, value } = courseTypeJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { TypeName, Description, RoleId } = value;

    try {
        const courseType = await db.courseTypes.create({
            TypeName,
            Description
        });
        res.status(201).send(courseType);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
};

const getAllCourseTypeController=async(req,res)=>{
    const courseType=await db.courseTypes.findAll();
    res.send(courseType);
}

const getByIdCourseTypeController=async(req,res)=>{
    const {id}=req.params;
    try{
        const courseType=await db.courseTypes.findByPk(id);
        if(!courseType){
            return res.status(404).send({
                message:`courseType with id=${id} not found`
            })
        }
        res.send(courseType);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const updateCourseTypeController=async (req,res)=>{
    const{error,value}=courseTypeJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const{TypeName,Description}=value;
    try{
        const courseType=await db.courseTypes.findByPk(id);
        if(!courseType){
            return res.status(404).send({
                message:`courseType with id=${id} not found`
            })
        }
        courseType.TypeName=TypeName;
        courseType.Description=Description;

        await courseType.save();
        res.send(courseType);
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

const deleteCourseTypeController=async(req,res)=>{
    const {id}=req.params;
    try{
        const courseType=await db.courseTypes.findByPk(id);
        if(!courseType){
            return res.status(404).send({
                message:`courseType with id=${id} not found`
            })
        }
        await courseType.destroy();
        res.send({
            message: `courseType with id ${id} was deleted successfully.`,
        })
    }catch(error){
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the UserType.',
        });
    }
}

module.exports={
    postCourseTypeController,
    getAllCourseTypeController,
    getByIdCourseTypeController,
    updateCourseTypeController,
    deleteCourseTypeController
}