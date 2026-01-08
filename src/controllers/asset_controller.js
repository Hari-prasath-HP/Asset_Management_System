const assetService = require('../services/asset_service');
const assetRepo = require('../repositories/asset_repository');
const employeeRepo = require('../repositories/employee_repository');
const transactionRepo = require('../repositories/assetTransaction_repository');
const categoryRepo = require('../repositories/assetCategory_repository');

// Render add asset page
const getAddAssetPage=async(req, res)=>{
  try {
    const categories = await categoryRepo.getAllCategories();
    res.render('assets/add', { categories });
  } catch (error) {
    res.redirect('/assets');
  }
};

// Create asset (UI)
const createAsset=async(req, res)=>{
  try {
    await assetService.createAsset(req.body);
    res.redirect('/assets');
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Render asset list
const renderAssetList=async(req, res)=>{
  try {
    const assets = await assetRepo.getAllAssets();
    res.render('assets/list', { assets });
  } catch (error) {
    res.status(500).send('Failed to load assets');
  }
};

/*
  -------- API CONTROLLERS --------
*/

// Issue asset (API)
const issueAsset=async(req, res)=>{
  try {
    const { assetId, employeeId } = req.body;

    await assetService.issueAsset(assetId, employeeId);

    res.status(200).json({
      success: true,
      message: 'Asset issued successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Return asset (API)
const returnAsset=async(req, res)=>{
  try {
    const { assetId, reason } = req.body;

    await assetService.returnAsset(assetId, reason);

    res.status(200).json({
      success: true,
      message: 'Asset returned successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Send asset for service (API)
const sendForService=async(req, res)=>{
  try {
    const { assetId, reason } = req.body;

    await assetService.sendForService(assetId, reason);

    res.status(200).json({
      success: true,
      message: 'Asset sent for service'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get asset history (API)
const assetHistory=async(req, res)=>{
  try {
    const { assetId } = req.params;

    const history = await assetService.getAssetHistory(assetId);

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/*
  -------- UI CONTROLLERS --------
*/

// Render issue page
const renderIssuePage=async(req, res)=>{
  try {
    const asset = await assetRepo.getAssetById(req.params.id);
    const employees = await employeeRepo.getActiveEmployees();

    res.render('assets/issue', { asset, employees });
  } catch (error) {
    res.status(500).send('Failed to load issue page');
  }
};

// Issue asset (UI)
const issueAssetUI=async(req, res)=>{
  try {
    await assetService.issueAsset(
      req.params.id,
      req.body.employeeId
    );

    res.redirect('/assets');
  } catch (error) {
    const asset = await assetRepo.getAssetById(req.params.id);
    const employees = await employeeRepo.getAllEmployees();

    res.render('assets/issue', {
      asset,
      employees,
      error: error.message
    });
  }
};

// Render return page
const renderReturnPage=async(req, res)=>{
  try {
    const asset = await assetRepo.getAssetById(req.params.id);
    res.render('assets/return', { asset });
  } catch (error) {
    res.status(500).send('Failed to load return page');
  }
};

// Return asset (UI)
const returnAssetUI=async(req, res)=>{
  try {
    await assetService.returnAsset(
      req.params.id,
      req.body.reason
    );

    res.redirect('/assets');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Render asset history page
const renderAssetHistory=async(req, res)=>{
  try {
    const asset = await assetRepo.getAssetById(req.params.id);
    const history = await transactionRepo.getAssetHistory(req.params.id);

    res.render('assets/history', { asset, history });
  } catch (error) {
    res.status(500).send('Failed to load asset history');
  }
};

// Render edit asset page
const editAsset=async(req, res)=>{
  try {
    const asset = await assetRepo.getAssetById(req.params.id);
    const categories = await categoryRepo.getAllCategories();

    if (!asset) return res.redirect('/assets');

    res.render('assets/edit', {
      asset,
      categories,
      error: null
    });
  } catch (error) {
    res.redirect('/assets');
  }
};

// Update asset

const updateAsset=async(req, res)=>{
  try {
    const {
      uniqueId,
      serialNumber,
      model,
      branch,
      categoryId,
      status
    } = req.body;

    if (!uniqueId || !serialNumber || !branch || !categoryId) {
      const asset = await assetRepo.getAssetById(req.params.id);

      return res.render('assets/edit', {
        asset,
        error: 'Required fields are missing'
      });
    }

    await assetRepo.updateAsset(req.params.id, {
      uniqueId,
      serialNumber,
      model,
      branch,
      categoryId,
      status
    });

    res.redirect('/assets');
  } catch (error) {
    const asset = await assetRepo.getAssetById(req.params.id);

    res.render('assets/edit', {
      asset,
      error: 'Unique ID or Serial Number already exists'
    });
  }
};

// Render stock view
const renderStockView=async(req, res)=>{
  try {
    const stockData = await assetService.getStockViewData();

    res.render('assets/stock', {
      assets: stockData.assets,
      branchSummary: stockData.branchSummary,
      totalAssets: stockData.totalAssets
    });
  } catch (error) {
    res.redirect('/assets');
  }
};

module.exports = {
  getAddAssetPage,
  createAsset,
  renderAssetList,
  issueAsset,
  returnAsset,
  sendForService,
  assetHistory,
  renderIssuePage,
  issueAssetUI,
  renderReturnPage,
  returnAssetUI,
  renderAssetHistory,
  editAsset,
  updateAsset,
  renderStockView
};
