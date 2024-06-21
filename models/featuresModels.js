module.exports = (sequelize, Sequelize) => {
    const Features = sequelize.define('Features', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'Features',
        timestamps: false
    });
    return Features;
};
