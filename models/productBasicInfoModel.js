module.exports = (sequelize,DataTypes)=>{
    const Product_Basic_Info = sequelize.define('product_basic_info',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type:DataTypes.INTEGER
        }
        
    })
    return Product_Basic_Info
}