module.exports = (sequelize, Sequelize)=>{
    const Subject = sequelize.define('Subject', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        SubjectName: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'Subject',
        timestamps: false
    });
    return Subject;
}