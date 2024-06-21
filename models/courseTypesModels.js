module.exports = (sequelize, Sequelize) => {
    const CourseTypes = sequelize.define('CourseTypes', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TypeName: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'CourseTypes',
        timestamps: false
    });
    return CourseTypes;
};