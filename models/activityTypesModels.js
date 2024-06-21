module.exports = (sequelize, Sequelize)=>{
    const ActivityTypes=sequelize.define('ActivityTypes',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TypeName:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        tableName:'ActivityTypes',
        timestamps: false
    })
    return ActivityTypes
}