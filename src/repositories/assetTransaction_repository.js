const { AssetTransaction, Employee } = require('../models');

// Create new asset transaction
const createTransaction=async(data)=>{
  try {
    const transaction = await AssetTransaction.create(data);
    return transaction;
  } catch (error) {
    throw error;
  }
};

// Get asset transaction history with employee details
const getAssetHistory=async(assetId)=>{
  try {
    const transactions = await AssetTransaction.findAll({
      where: {
        assetId: assetId
      },
      include: [
        {
          model: Employee,
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    return transactions;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTransaction,
  getAssetHistory
};
