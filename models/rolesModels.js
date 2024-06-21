
module.exports=(sequelize, Sequelize)=>{
    const Role=sequelize.define('Role',{
        Id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        Name:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        Description:{
            type:Sequelize.TEXT,
            allowNull:true
        }
    },{
        tableName:'Role',
        timestamps: false
    })
    return Role;
}