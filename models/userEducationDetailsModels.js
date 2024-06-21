module.exports=(sequelize, Sequelize)=>{
   const UserEducationDetails=sequelize.define('UserEducationDetails',{
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
    EducationTitle:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    Description:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    PassingYear:{
        type:Sequelize.TEXT,
        allowNull:true
    },
   },{
    tableName:'UserEducationDetails',
    timestamps: false
   })
    return UserEducationDetails;
}