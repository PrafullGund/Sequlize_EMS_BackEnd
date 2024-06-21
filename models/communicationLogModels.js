module.exports = (sequelize, Sequelize)=>{
    const CommunicationLogModel=sequelize.define('CommunicationLogModel',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        EnquiryId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'enquiries',
                key:'Id'
            }
        },
        CustomerId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'user',
                key:'Id'
            }
        },
        ActivityId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'activities',
                key:'Id'
            }
        },
        ActivityStatusId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'activityStatus',
                key:'Id'
            }
        },
        SalesRepresentativeId:{
            type:Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'user',
                key:'Id'
            }
        },
        CommunicationDate:{
            type:Sequelize.DATE,
            allowNull: false,
        },
        CommunicationDetails:{
            type:Sequelize.TEXT,
            allowNull: false,
        }
    },{
        tableName:'CommunicationLog',
        timestamps: false
    })
    return CommunicationLogModel
}