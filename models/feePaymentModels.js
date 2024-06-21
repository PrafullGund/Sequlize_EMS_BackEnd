module.exports = (sequelize, Sequelize) =>{
    const FeePayments = sequelize.define('FeePayments', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AdmissionId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'admissions',
                key: 'Id'
            },
            allowNull: false
        },
        AmountCredited: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        BalanceAmount: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        PaymentDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        PaymentMethod: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['online', 'cash', 'UPI', 'card']]
            }
        },
        NextDueDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },{
        tableName: 'FeePayments',
        timestamps: false
    })
    return FeePayments
}