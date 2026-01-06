const {DataTypes} = require('sequelize')
const Sequelize = require('../config/sequelize')

const AssetCategory = Sequelize.define('AssetCategory',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    }
},{
    tableName: 'asset_category'
})

module.exports = AssetCategory