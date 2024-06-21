module.exports = (sequelize, Sequelize)=>{
    const ActivityStatus=sequelize.define('ActivityStatus',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        StatusName:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        tableName:'ActivityStatus',
        timestamps: false
    })
    return ActivityStatus
}