const db=require('../config/db.config');
const {timeTableJoi}=require('../helpers/timeTableJoi')

const postTimeTableController = async (req, res) => {
    const { error, value } = timeTableJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const { FacultyId, SyllabusId, WeekDayId, SlotStartTime, SlotEndTime } = value;
    try {
        const weekDay = await db.weekDays.findByPk(WeekDayId);
        if (!weekDay) {
            return res.status(400).send({
                message: 'Invalid WeekDayId. WeekDay does not exist.'
            });
        }
        const time = await db.timeTable.create({
            FacultyId,
            SyllabusId,
            WeekDayId,
            SlotStartTime,
            SlotEndTime
        });
        res.status(201).send(time);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the timetable entry.'
        });
    }
};

const getAllWeekDaysController=async(req,res)=>{
    const time=await db.timeTable.findAll();
    res.status(200).send(time);
}

const getWeekDaysByIdController=async(req,res)=>{
    const {id}=req.params;
    try{
        const time=await db.timeTable.findByPk(id);
        if(!time){
            return res.status(404).send({
                message:`time with id=${id} not found`
            })
        }
        res.send(time);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the timetable entry.'
        });
    }
}

const updateTimeTableController=async(req,res)=>{
    const { error, value } = timeTableJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const{id}=req.params;
    const { FacultyId, SyllabusId, WeekDayId, SlotStartTime, SlotEndTime } = value;
    try{
        const time=await db.timeTable.findByPk(id);
        if(!time){
            return res.status(404).send({
                message:`time with id=${id} not found`
            })
        }
        time.FacultyId=FacultyId
        time.SyllabusId=SyllabusId
        time.WeekDayId=WeekDayId
        time.SlotStartTime=SlotStartTime
        time.SlotEndTime=SlotEndTime

        await time.save();
        res.send(time);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the timetable entry.'
        });
    }
}

const deleteTimeTableController=async (req,res)=>{
    const{id}=req.params;
    try{
        const time=await db.timeTable.findByPk(id);
        if(!time){
            return res.status(404).send({
                message:`time with id=${id} not found`
            })
        }
        await time.destroy();
        res.send({
            message:`time is id ${id} deleted successfully`
        })
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the timetable entry.'
        });
    }
}
module.exports = {
    postTimeTableController,
    getAllWeekDaysController,
    getWeekDaysByIdController,
    updateTimeTableController,
    deleteTimeTableController
};