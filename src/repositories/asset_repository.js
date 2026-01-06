const { Asset } = require('../models');
const { ASSET_STATUS } = require('../utils/constants');

// New asset
const createAsset = async (assetData) => {
  return Asset.create(assetData);
};

// inStock assets
const getAvailableAssets = async () => {
  return Asset.findAll({
    where: { status: ASSET_STATUS.IN_STOCK }
  });
};

// By ID
const getAssetById = async (id) => {
  return Asset.findByPk(id);
};

// Update assests current status
const updateAssetStatus = async (assetId, status, employeeId = null) => {
  return Asset.update(
    {
      status,
      currentEmployeeId: employeeId
    },
    {
      where: { id: assetId }
    }
  );
};
// Get all assets
const getAllAssets = async () => {
  return Asset.findAll({ order: [['id', 'ASC']] });
};



module.exports = {
  createAsset,
  getAvailableAssets,
  getAssetById,
  updateAssetStatus,
  getAllAssets
};
