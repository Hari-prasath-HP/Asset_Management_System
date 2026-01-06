const {DataTypes} = require('sequelize')
const Sequelize = require('../config/sequelize')
const database = require('../config/database')

const Employee = Sequelize.define('Employees',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employeeCode:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    department:{
        type: DataTypes.ENUM('DEVELOPER','TRAINEE','TL','MANAGER','HR','FINANCE','ADMIN'),
        allowNull: false
    },
    branch:{
        type: DataTypes.ENUM('Chennai','Coimbatore','Bangalore'),
        allowNull: false
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
tableName: 'employees',
timestamps: true
})

module.exports = Employee