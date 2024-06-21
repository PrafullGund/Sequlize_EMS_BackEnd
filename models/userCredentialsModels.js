module.exports = (sequelize, Sequelize) => {
    const UserCredentials = sequelize.define('UserCredentials', {
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
          model: 'User',
          key: 'Id'
        }
      },
      Email: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      Mobile: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      Password: {
        type: Sequelize.STRING(15),
        allowNull: true
      }
    }, {
      tableName: 'UserCredentials',
      timestamps: false
    });
  
    return UserCredentials;
  };
  