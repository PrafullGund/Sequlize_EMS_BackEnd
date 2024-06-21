module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define('Course', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CourseName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Description: {
            type: Sequelize.TEXT, 
            allowNull: false
        },
        CourseFees: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        CourseDuration: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        CourseTypeId: {
            type: Sequelize.INTEGER, 
            allowNull: false,
            references: {
                model: 'courseTypes',
                key: 'Id'
            }
        },
    }, {
        tableName: 'Course',
        timestamps: false
    });
    return Course;
}