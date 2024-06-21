const db=require('../config/db.config');
const {syllabusJoi}=require('../helpers/syllabusJoi');

const postSyllabusController = async (req, res) => {
    const { error, value } = syllabusJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {SubjectId,SectionName,TopicName,CourseTypeId}=value;
    try{
        const syllabus=await db.syllabus.create({
            SubjectId,SectionName,TopicName,CourseTypeId
        });
        res.send(syllabus);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Feature'
        });
    }
};

const getAllSyllabusController = async (req, res) => {
    try {
        const syllabus = await db.syllabus.findAll();
        res.send(syllabus);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving syllabi'
        });
    }
};

const getSyllabusByIdController = async (req, res) => {
    const id = req.params.id;
    try {
        const syllabus = await db.syllabus.findByPk(id);
        if (!syllabus) {
            return res.status(404).send({
                message: `Syllabus with id ${id} not found`
            });
        }
        res.send(syllabus);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving the syllabus'
        });
    }
};

const updateSyllabusController = async (req, res) => {
    const id = req.params.id;
    const { error, value } = syllabusJoi.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        const [updated] = await db.syllabus.update(value, {
            where: { id: id }
        });
        if (updated) {
            const updatedSyllabus = await db.syllabus.findByPk(id);
            return res.send(updatedSyllabus);
        }
        throw new Error('Syllabus not found');
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the syllabus'
        });
    }
};

const deleteSyllabusController = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await db.syllabus.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.send({
                message: 'Syllabus deleted successfully'
            });
        }
        throw new Error('Syllabus not found');
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while deleting the syllabus'
        });
    }
};

module.exports={
    postSyllabusController,
    getAllSyllabusController,
    getSyllabusByIdController,
    updateSyllabusController,
    deleteSyllabusController
}