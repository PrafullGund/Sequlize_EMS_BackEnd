module.exports=(sequelize, Sequelize)=>{
    const UserAdresses=sequelize.define('UserAdresses',{
        Id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        UserId:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: 'User',
                key: 'Id'
              }
        },
        AddressLineOne:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        AddressLineTwo:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        Country:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        State:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        City:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        PostalCode:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
    },{
        tableName: 'UserAdresses',
        timestamps: false
      });
    return UserAdresses;
}