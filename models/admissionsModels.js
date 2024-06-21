module.exports = (sequelize, Sequelize)=>{
    const Admissions =sequelize.define('Admissions ',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        EnquiryId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'enquiries', // Name of the table
                key: 'Id'
            }
        },
        AdmissionDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: false,
    },
    },{
        tableName:'Admissions',
        timestamps: false
    })

    return Admissions
}