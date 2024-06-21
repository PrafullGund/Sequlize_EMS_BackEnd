module.exports = (sequelize, Sequelize)=>{
    const User=sequelize.define('User',{
        Id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        FirstName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        LastName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        DOB:{
            type:Sequelize.DATE,
            allowNull:false
        },
        UserTypeId:{
            type:Sequelize.INTEGER,
            reference:{
                model:'UserType',
                key:'Id',
            }
        }
    },
    {
        tableName: 'User',
        timestamps: false     
    })
    return User
}
