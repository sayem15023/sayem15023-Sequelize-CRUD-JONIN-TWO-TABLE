module.exports = (sequelize,DataTypes)=>{
    const Basic = sequelize.define('basic',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        productType:{
            type:DataTypes.STRING
        }
    })
    return Basic
}