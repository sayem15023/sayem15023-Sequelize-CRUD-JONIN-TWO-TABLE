module.exports = (sequelize,DataTypes)=>{
    const Advanced = sequelize.define('advanced',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        price:{
            type:DataTypes.INTEGER
        },
        color:{
            type:DataTypes.STRING
        }
    })
    return Advanced
}