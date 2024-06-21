const db=require('../config/db.config');
const {courseJoi}=require('../helpers/courseJoi');

const postCourseController=async(req,res)=>{
    const {error,value}=courseJoi.validate(req.body);
    if(error){
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{CourseName,Description,CourseFees,CourseDuration,CourseTypeId}=value
    try{
        const course=await db.course.create({
            CourseName,Description,CourseFees,CourseDuration,CourseTypeId
        })
        res.status(201).send(course);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
}

const getAllCourseController=async(req,res)=>{
    const course=await db.course.findAll();
    res.status(200).send(course);
}

const getByIdCourseController=async(req,res)=>{
    const {id}=req.params;
    try{
        const course=await db.course.findByPk(id);
        if(!course){
            return res.status(404).send({
                message:`course with id ${id} not found`
            })
        }
        res. send(course);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
}

const updateCourseController=async(req,res)=>{
    const {error,value}=courseJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const{CourseName,Description,CourseFees,CourseDuration,CourseTypeId}=value
    const {id}=req.params;
    try{
        const course=await db.course.findByPk(id);
        if(!course){
            return res.status(404).send({
                message:`course with id ${id} not found`
            })
        }
        course.CourseName=CourseName;
        course.Description=Description;
        course.CourseFees=CourseFees;
        course.CourseDuration=CourseDuration;
        course.CourseTypeId=CourseTypeId

        await course.save();
        res.send(course);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
}

const deleteCourseController=async (req,res)=>{
    const{id}=req.params;
    try{
        const course=await db.course.findByPk(id);
        if(!course){
            return res.status(404).send({
                message:`course with id ${id} not found`
            })
        }
        await course.destroy();
        res.send({
            message:`course with id ${id} deleted successfully`
        })
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
}

module.exports={
    postCourseController,
    getAllCourseController,
    getByIdCourseController,
    updateCourseController,
    deleteCourseController
}