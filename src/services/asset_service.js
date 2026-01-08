const assetRepo = require('../repositories/asset_repository');
const transactionRepo = require('../repositories/assetTransaction_repository');
const employeeRepo = require('../repositories/employee_repository');
const { ASSET_STATUS, TRANSACTION_TYPE } = require('../utils/constants');

// Create new asset
const createAsset = async (data) => {
  try {
    const {
      uniqueId,
      serialNumber,
      model,
      branch,
      categoryId
    } = data;
    if (!uniqueId || !serialNumber || !model || !branch || !categoryId) {
      throw new Error('All fields are required');
    }
    const asset = await assetRepo.createAsset({
      uniqueId: uniqueId,
      serialNumber: serialNumber,
      model: model,
      branch: branch,
      categoryId: categoryId,
      status: ASSET_STATUS.AVAILABLE
    });

    return asset;
  } catch (error) {
    throw error;
  }
};

// Issue asset to employee
const issueAsset=async(assetId, employeeId)=>{
  try {
    const asset = await assetRepo.getAssetById(assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }
    if (asset.status !== ASSET_STATUS.AVAILABLE) {
      throw new Error('Asset is not available');
    }
    const employee = await employeeRepo.getEmployeeById(employeeId);
    if (!employee || !employee.isActive) {
      throw new Error('Employee is invalid or inactive');
    }
    if (asset.branch !== employee.branch) {
      throw new Error('Asset and employee branch mismatch');
    }
    await assetRepo.updateAssetStatus(
      assetId,
      ASSET_STATUS.ASSIGNED,
      employeeId
    );
    await transactionRepo.createTransaction({
      assetId: assetId,
      employeeId: employeeId,
      transactionType: TRANSACTION_TYPE.ASSIGNED
    });

    return true;
  } catch (error) {
    throw error;
  }
};

// Return asset
const returnAsset=async(assetId, reason)=>{
  try {
    const asset = await assetRepo.getAssetById(assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }

    if (asset.status !== ASSET_STATUS.ASSIGNED) {
      throw new Error('Asset is not assigned');
    }

    const employeeId = asset.currentEmployeeId;

    await assetRepo.updateAssetStatus(
      assetId,
      ASSET_STATUS.AVAILABLE,
      null
    );

    await transactionRepo.createTransaction({
      assetId: assetId,
      employeeId: employeeId,
      transactionType: TRANSACTION_TYPE.RETURN,
      reason: reason
    });

    return true;
  } catch (error) {
    throw error;
  }
};

// Send asset for service
const sendForService=async(assetId, reason)=>{
  try {
    const asset = await assetRepo.getAssetById(assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }

    if (asset.status !== ASSET_STATUS.ASSIGNED) {
      throw new Error('Only assigned assets can be sent for service');
    }

    await assetRepo.updateAssetStatus(
      assetId,
      ASSET_STATUS.SERVICE,
      null
    );

    await transactionRepo.createTransaction({
      assetId: assetId,
      transactionType: TRANSACTION_TYPE.SERVICE,
      reason: reason
    });

    return true;
  } catch (error) {
    throw error;
  }
};

// Get asset transaction history
const getAssetHistory=async(assetId)=>{
  try {
    const history = await transactionRepo.getAssetHistory(assetId);
    return history;
  } catch (error) {
    throw error;
  }
};

// Stock view data
const getStockViewData=async()=>{
  try {
    const assets = await assetRepo.getAvailableAssets();
    const branchSummary = await assetRepo.getStockCountByBranch();
    const totalAssets = await assetRepo.getTotalAvailableAssets();

    return {
      assets: assets,
      branchSummary: branchSummary,
      totalAssets: totalAssets
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAsset,
  issueAsset,
  returnAsset,
  sendForService,
  getAssetHistory,
  getStockViewData
};
