module.exports = (sequelize, Sequelize)=>{
    const Activities=sequelize.define('Activities',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ActivityTypeId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: 'activitytypes',
                key: 'Id'
              }
        },
        ActivityStatusId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:'activitystatus',
                key:'Id'
            }
        },
        DueDate:{
            type:Sequelize.DATE,
            allowNull:false
        },
        SalesRepresentativeId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:'user',
                key:'Id'
            }
        },
        Summary:{
            type:Sequelize.TEXT,
            allowNull:false
        }
    },{
        tableName: 'Activities',
        timestamps: false
    })
    return Activities;
}