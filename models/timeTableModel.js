module.exports = (sequelize, Sequelize)=>{
    const TimeTable=sequelize.define('TimeTable',{
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FacultyId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'user',
        key:'Id'
      }
    },
    SyllabusId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'syllabus',
        key:'Id'
      }
    },
    WeekDayId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'weekDays',
        key:'Id'
      }
    },
    SlotStartTime:{
      type: Sequelize.TIME,
      allowNull: false,
    },
    SlotEndTime:{
      type: Sequelize.TIME,
      allowNull: false,
    }
  },{
    tableName: 'TimeTable',
    timestamps: false
  })
    return TimeTable
}