const { DataTypes } = require('sequelize');
const Sequelize = require('../config/sequelize');

const AssetTransaction = Sequelize.define('AssetTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transactionType: {
    type: DataTypes.ENUM('ASSIGNED','RETURN','SERVICE','SCRAP'),
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING
  },
  transactionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'asset_transactions'
});

module.exports = AssetTransaction;
