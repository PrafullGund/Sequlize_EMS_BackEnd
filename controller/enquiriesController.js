const db = require('../config/db.config');
const { enquiriesJoi } = require('../helpers/enquiriesJoi');

const postEnquiriesController = async (req, res) => {
    const { error, value } = enquiriesJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { Name, Email, Mobile, EnquirySource, CourseId, PipeLinePhaseId, SalesPersonId } = value;

    try {
        const courseExists = await db.course.findOne({ where: { Id: CourseId } });
        if (!courseExists) {
            return res.status(400).send({ message: 'Invalid CourseId' });
        }

        const pipeLinePhaseExists = await db.pipeLinePhases.findOne({ where: { Id: PipeLinePhaseId } });
        if (!pipeLinePhaseExists) {
            return res.status(400).send({ message: 'Invalid PipeLinePhaseId' });
        }

        const salesPersonExists = await db.user.findOne({ where: { Id: SalesPersonId } });
        if (!salesPersonExists) {
            return res.status(400).send({ message: 'Invalid SalesPersonId' });
        }

        const enquiry = await db.enquiries.create({
            Name, Email, Mobile, EnquirySource, CourseId, PipeLinePhaseId, SalesPersonId
        });

        res.status(201).send(enquiry);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the enquiry.'
        });
    }
}

const getAllEnquiriesController=async(req,res)=>{
    const enquiries=await db.enquiries.findAll();
    res.status(200).send(enquiries);
}

const getEnquiryByIdController =async(req,res)=>{
    const {id}=req.params;
    try{
        const enquiries=await db.enquiries.findByPk(id);
        if(!enquiries){
            return res.status(400).send({ message:"Enquiry not found"})
        }
        res.status(200).send(enquiries);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the enquiry.'
        });
    }
}

const updateEnquiryController =async(req,res)=>{
    const{error,value}=enquiriesJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {id}=req.params
    const{Name,Email,Mobile,EnquirySource,CourseId,PipeLinePhaseId,SalesPersonId}=value
    try{
        const enquiries=await db.enquiries.findByPk(id);
        if(!enquiries){
            return res.status(400).send({ message:"Enquiry not found"})
        }
        enquiries.Name=Name;
        enquiries.Email=Email;
        enquiries.Mobile=Mobile;
        enquiries.EnquirySource=EnquirySource;
        enquiries.CourseId=CourseId;
        enquiries.PipeLinePhaseId=PipeLinePhaseId;
        enquiries.SalesPersonId=SalesPersonId;

        await enquiries.save();
        res.status(200).send(enquiries);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the enquiry.'
        });
    }
}

const deleteEnquiryController=async(req,res)=>{
    const {id}=req.params;
    try{
        const enquiries=await db.enquiries.findByPk(id);
        if(!enquiries){
            return res.status(404).send({ message: 'Enquiry not found' });
        }
        await enquiries.destroy();
        res.send({
            message:`Enquiries with ${id} was deleted successfully`
        })
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while deleting the enquiry.'
        });
    }
}

module.exports = {
    postEnquiriesController,
    getAllEnquiriesController,
    getEnquiryByIdController,
    updateEnquiryController,
    deleteEnquiryController
};
