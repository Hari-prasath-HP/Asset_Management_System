const { DataTypes } = require('sequelize');
const Sequelize = require('../config/sequelize');

const Asset = Sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uniqueId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  serialNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING
  },
  status: {
  type: DataTypes.ENUM('Available','Assigned','Service','Scrap'),
  allowNull: false,
  defaultValue: 'Available'
}
}, {
  tableName: 'assets'
});

module.exports = Asset;
