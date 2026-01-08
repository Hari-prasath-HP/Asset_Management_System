const { Asset } = require('../models');
const AssetCategory = require('../models/AssetCategory');
const { Sequelize } = require('sequelize');
const { ASSET_STATUS } = require('../utils/constants');

// Create a new asset
const createAsset=async(data)=>{
  try {
    const asset = await Asset.create(data);
    return asset;
  } catch (error) {
    throw error;
  }
};

//Get all available assets 
const getAvailableAssets=async()=>{
  try {
    const assets = await Asset.findAll({
      where: {
        status: ASSET_STATUS.AVAILABLE
      },
      include: [
        {
          model: AssetCategory,
          attributes: ['name']
        }
      ],
      order: [['branch', 'ASC']]
    });

    return assets;
  } catch (error) {
    throw error;
  }
};

// Get available asset count branch-wise
const getStockCountByBranch=async()=>{
  try {
    const result = await Asset.findAll({
      where: {
        status: ASSET_STATUS.AVAILABLE
      },
      attributes: [
        'branch',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['branch']
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// Get total available asset count
const getTotalAvailableAssets=async()=>{
  try {
    const count = await Asset.count({
      where: {
        status: ASSET_STATUS.AVAILABLE
      }
    });

    return count;
  } catch (error) {
    throw error;
  }
};

// Get asset details using asset id
const getAssetById=async(assetId)=>{
  try {
    const asset = await Asset.findByPk(assetId);
    return asset;
  } catch (error) {
    throw error;
  }
};

// Update asset status and assign employee
const updateAssetStatus=async(assetId, status, employeeId)=>{
  try {
    const result = await Asset.update(
      {
        status: status,
        currentEmployeeId: employeeId
      },
      {
        where: { id: assetId }
      }
    );

    return result;
  } catch (error) {
    throw error;
  }
};

// Get all assets
const getAllAssets=async()=>{
  try {
    const assets = await Asset.findAll({
      order: [['id', 'ASC']]
    });

    return assets;
  } catch (error) {
    throw error;
  }
};

// Update asset details
const updateAsset=async(assetId,data)=>{
  try {
    const result = await Asset.update(data, {
      where: { id: assetId }
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAsset,
  getAvailableAssets,
  getStockCountByBranch,
  getTotalAvailableAssets,
  getAssetById,
  updateAssetStatus,
  getAllAssets,
  updateAsset
};
