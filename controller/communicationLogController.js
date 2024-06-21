const db = require('../config/db.config');
const { communicationLogJoi } = require('../helpers/communicationLogJoi');

const postCommunicationLogController = async (req, res) => {
    const { error, value } = communicationLogJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { EnquiryId, CustomerId, ActivityId, ActivityStatusId, SalesRepresentativeId, CommunicationDate, CommunicationDetails } = value;
    try {
        const communicationLog = await db.communicationLog.create({
            EnquiryId,
            CustomerId,
            ActivityId,
            ActivityStatusId,
            SalesRepresentativeId,
            CommunicationDate,
            CommunicationDetails
        });
        res.status(201).send(communicationLog);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Communication Log'
        });
    }
}

const getAllCommunicationLogController = async (req, res) => {
    const communicationLog = await db.communicationLog.findAll();
    res.status(200).send(communicationLog);
}

const getCommunicationLogByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const communicationLog = await db.communicationLog.findByPk(id);
        if (!communicationLog) {
            return res.status(400).send({ message: "communicationLog not found" })
        }
        res.status(200).send(communicationLog);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Communication Log'
        });
    }
}

const updateCommunicationController=async(req,res)=>{
    const { error, value } = communicationLogJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const { EnquiryId, CustomerId, ActivityId, ActivityStatusId, SalesRepresentativeId, CommunicationDate, CommunicationDetails } = value;
    try{
        const communicationLog=await db.communicationLog.findByPk(id);
        if (!communicationLog) {
            return res.status(400).send({ message: "communicationLog not found" })
        }
        communicationLog.EnquiryId=EnquiryId;
        communicationLog.CustomerId=CustomerId;
        communicationLog.ActivityId=ActivityId;
        communicationLog.ActivityStatusId=ActivityStatusId;
        communicationLog.SalesRepresentativeId=SalesRepresentativeId;
        communicationLog.CommunicationDate=CommunicationDate;
        communicationLog.CommunicationDetails=CommunicationDetails;

        await communicationLog.save();
        res.status(200).send(communicationLog);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Communication Log'
        });
    }
}

const deleteCommunicationLogController=async (req,res)=>{
    const {id}=req.params;
    try{
        const communicationLog=await db.communicationLog.findByPk(id);
        if (!communicationLog) {
            return res.status(400).send({ message: "communicationLog not found" })
        }
        await communicationLog.destroy();
        res.send({
            message:`communicationLog with ${id} was deleted successfully`
        })
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Communication Log'
        });
    }
}

module.exports = {
    postCommunicationLogController,
    getAllCommunicationLogController,
    getCommunicationLogByIdController,
    updateCommunicationController,
    deleteCommunicationLogController
};
