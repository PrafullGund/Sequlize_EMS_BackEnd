module.exports = (sequelize, Sequelize) =>{
    const WeekDays = sequelize.define('WeekDays', {
        Id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Name: {
          type: Sequelize.STRING, // Ensure Name is defined and not nullable
          allowNull: false
      }
      },{
        tableName: 'WeekDays',
        timestamps: false
      });
      return WeekDays
}