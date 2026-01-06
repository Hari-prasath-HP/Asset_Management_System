const assetRepo = require('../repositories/asset_repository');
const transactionRepo = require('../repositories/assetTransaction_repository');
const employeeRepo = require('../repositories/employee_repository');
const { ASSET_STATUS, TRANSACTION_TYPE } = require('../utils/constants');


// Assign
const issueAsset = async (assetId, employeeId) => {
  console.log(assetId, employeeId)

  const asset = await assetRepo.getAssetById(assetId);
  console.log(asset?.toJSON())

  if (!asset) {
    throw new Error('Asset not found');
  }
  if (asset.status !== ASSET_STATUS.AVAILABLE) {
    throw new Error('Asset is not available for issue');
  }
  const employee = await employeeRepo.getEmployeeById(employeeId);
  console.log(employee?.toJSON())

  if (!employee || !employee.isActive) {
    throw new Error('Invalid or inactive employee');
  }
  await assetRepo.updateAssetStatus(
    assetId,
    ASSET_STATUS.ASSIGNED,
    employeeId
  );
  await transactionRepo.createTransaction({
    assetId,
    employeeId,
    transactionType: TRANSACTION_TYPE.ASSIGNED
  });

  return true;
};


//Return
const returnAsset = async (assetId, reason) => {
  const asset = await assetRepo.getAssetById(assetId);
  if (!asset) throw new Error('Asset not found');

  if (asset.status !== ASSET_STATUS.ASSIGNED) {
    throw new Error('Asset is not currently assigned');
  }

  const employeeId = asset.currentEmployeeId;

  await assetRepo.updateAssetStatus(
    assetId,
    ASSET_STATUS.AVAILABLE,
    null
  );

  await transactionRepo.createTransaction({
    assetId,
    employeeId,
    transactionType: TRANSACTION_TYPE.RETURN,
    reason
  });

  return true;
};

// Service 
const sendForService = async (assetId, reason) => {
  const asset = await assetRepo.getAssetById(assetId);
  if (!asset) throw new Error('Asset not found');

  if (asset.status !== ASSET_STATUS.ASSIGNED) {
    throw new Error('Only assigned assets can be sent for service');
  }

  await assetRepo.updateAssetStatus(
    assetId,
    ASSET_STATUS.SERVICE,
    null
  );

  await transactionRepo.createTransaction({
    assetId,
    transactionType: TRANSACTION_TYPE.SERVICE,
    reason
  });

  return true;
};

//History
const getAssetHistory = (assetId) => {
  return transactionRepo.getAssetHistory(assetId);
};

module.exports = {
  issueAsset,
  returnAsset,
  sendForService,
  getAssetHistory
};
