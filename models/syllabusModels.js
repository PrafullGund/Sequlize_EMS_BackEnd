module.exports = (sequelize, Sequelize)=>{
    const Syllabus=sequelize.define('Syllabus',{
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        SubjectId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'subject',
                key:'Id'
            }
        },
        SectionName:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        TopicName:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        CourseTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'courseTypes',
                key: 'Id'
            }
        }
    },{
        tableName: 'Syllabus',
        timestamps: false
    })
    return Syllabus
}