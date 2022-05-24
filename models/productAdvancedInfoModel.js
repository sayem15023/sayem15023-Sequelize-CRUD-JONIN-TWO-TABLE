module.exports = (sequelize,DataTypes)=>{
    const product_advance_info = sequelize.define('product_advance_info',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        product_type:{
            type:DataTypes.STRING
        },
        color:{
            type:DataTypes.STRING
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    })
    return product_advance_info
}