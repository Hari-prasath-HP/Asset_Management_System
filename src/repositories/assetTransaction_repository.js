const { AssetTransaction, Employee } = require('../models');

// create new transaction
const createTransaction = async (transactionData) => {
  return AssetTransaction.create(transactionData);
};

// asset history with employee info
const getAssetHistory = async (assetId) => {
  return AssetTransaction.findAll({
    where: { assetId },
    include: [
      {
        model: Employee,
        attributes: ['id', 'name']
      }
    ],
    order: [['createdAt', 'ASC']]
  });
};

module.exports = {
  createTransaction,
  getAssetHistory
};
