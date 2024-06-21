module.exports = (sequelize, Sequelize) => {
    const FeatureRoleMapping = sequelize.define('FeatureRoleMapping', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        FeaturesId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'features',
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
        },
    }, {
        tableName: 'FeatureRoleMapping',
        timestamps: false
    });

    return FeatureRoleMapping;
};
