module.exports = (sequelize, Sequelize)=>{
    const PipeLinePhases=sequelize.define('PipeLinePhases',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        PhaseName:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        tableName:'PipeLinePhases',
        timestamps: false
    })
    return PipeLinePhases
}