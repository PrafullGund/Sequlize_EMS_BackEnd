const db=require('../config/db.config');
const{pipeLinePhasesJoi}=require('../helpers/pipeLinePhasesJoi');


const postPipeLinePhasesController=async (req,res)=>{
    const {error,value}=pipeLinePhasesJoi.validate(req.body);
    if(error){
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    const {PhaseName}=value
    try{
        const phase=await db.pipeLinePhases.create({
            PhaseName:PhaseName
        });
        res.status(201).send(phase)

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const getAllPipeLinePhasesController=async(req,res)=>{
    const phase=await db.pipeLinePhases.findAll();
    res.status(200).send(phase);
}

const getByIdPipeLinePhasesController=async(req,res)=>{
    const {id}=req.params;
    try{
        const phase=await db.pipeLinePhases.findByPk(id);
        if(!phase){
            return res.status(404).send({
                message:`phase with id=${id} not found`
            })
        }
        res.send(phase);
    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}

const updatePipeLinePhasesController = async (req, res) => {
    const { error, value } = pipeLinePhasesJoi.validate(req.body);
    
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const { id } = req.params;
    const { PhaseName } = value;

    try {
        const phase = await db.pipeLinePhases.findByPk(id);
        if (!phase) {
            return res.status(404).send({
                message: `phase with id=${id} not found`
            });
        }

        phase.PhaseName = PhaseName;
        await phase.save();
        res.send(phase);

    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while updating the Activity Type'
        });
    }
};

const deletePipeLinePhasesController=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const phase=await db.pipeLinePhases.findByPk(id);
        if(!phase){
            return res.status(404).send({
                message:`phase with id=${id} not found`
            })
        }
        await phase.destroy();
        res.send({
            message:`phase with ${id} was deleted successfully`
        })

    }catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the FeatureRoleMapping'
        });
    }
}


module.exports={
    postPipeLinePhasesController,
    getAllPipeLinePhasesController,
    getByIdPipeLinePhasesController,
    updatePipeLinePhasesController,
    deletePipeLinePhasesController
}
// pipeLinePhases