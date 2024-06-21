module.exports = (sequelize, Sequelize) => {
    const Enquiries = sequelize.define('Enquiries', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Mobile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        EnquirySource: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        CourseId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'course',
                key: 'Id'
            }
        },
        PipeLinePhaseId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pipeLinePhases',
                key: 'Id'
            }
        },
        SalesPersonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: "Id"
            }
        },
    }, {
        tableName: 'Enquiries',
        timestamps: false
    });

    return Enquiries;
};
