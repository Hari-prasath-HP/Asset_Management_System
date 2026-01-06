const sequelize = require('../config/sequelize');

const Employee = require('./Employee');
const Asset = require('./Asset');
const AssetCategory = require('./AssetCategory');
const AssetTransaction = require('./AssetTransaction');


// Assets category
Asset.belongsTo(AssetCategory, { foreignKey: 'categoryId' });
AssetCategory.hasMany(Asset, { foreignKey: 'categoryId' });

// Assets current holder
Asset.belongsTo(Employee, { foreignKey: 'currentEmployeeId' });
Employee.hasMany(Asset, { foreignKey: 'currentEmployeeId' });

// Assets trasnfers
AssetTransaction.belongsTo(Asset, { foreignKey: 'assetId' });
Asset.hasMany(AssetTransaction, { foreignKey: 'assetId' });

// Employees transfers
AssetTransaction.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(AssetTransaction, { foreignKey: 'employeeId' });

module.exports = {
  sequelize,
  Employee,
  Asset,
  AssetCategory,
  AssetTransaction
};