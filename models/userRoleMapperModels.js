module.exports = (sequelize, Sequelize) => {
    const UserRoleMapper = sequelize.define('UserRoleMapper', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', 
          key: 'Id'
        }
      },
      RoleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'Id'
        }
      }
    }, {
      tableName: 'UserRoleMapper',
      timestamps: false
    });
  
    return UserRoleMapper;
  };
  