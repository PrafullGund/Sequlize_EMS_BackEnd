module.exports = (sequelize, Sequelize) => {
  const UserType = sequelize.define('UserType', {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserTypeName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserTypeName is required'
        },
        notEmpty: {
          msg: 'UserTypeName cannot be empty'
        }
      }
    },
    UserTypeDescription: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },{
    tableName: 'UserType',
    timestamps: false
  })
  return UserType;
};
