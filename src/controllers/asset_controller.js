const assetService = require('../services/asset_service');
const assetRepo = require('../repositories/asset_repository')
const employeeRepo = require('../repositories/employee_repository');
const transactionRepo = require('../repositories/assetTransaction_repository')

const renderAssetList = async (req, res) => {
  try {
    const assets = await assetRepo.getAllAssets();
    res.render('assets/list', { assets });
  } catch (err) {
    res.status(500).send('Failed to load assets');
  }
};

// Issue Asset 
const issueAsset = async (req, res) => {
    console.log('Headers:', req.headers);
  console.log('Body:', req.body);
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

// Return asset

const returnAsset = async (req, res) => {
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

// Asset service

const sendForService = async (req, res) => {
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

// Transfer History

const assetHistory = async (req, res) => {
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
/* Render issue page */
const renderIssuePage = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await assetRepo.getAssetById(assetId);
    const employees = await employeeRepo.getActiveEmployees();

    res.render('assets/issue', { asset, employees });
  } catch (err) {
    res.status(500).send('Failed to load issue page');
  }
};

/* Handle issue submit */
const issueAssetUI = async (req, res) => {
  try {
    const assetId = req.params.id;
    const { employeeId } = req.body;

    await assetService.issueAsset(assetId, employeeId);

    res.redirect('/assets');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/* Render return page */
const renderReturnPage = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await assetRepo.getAssetById(assetId);

    res.render('assets/return', { asset });
  } catch (err) {
    res.status(500).send('Failed to load return page');
  }
};

/* Handle return submit */
const returnAssetUI = async (req, res) => {
  try {
    const assetId = req.params.id;
    const { reason } = req.body;

    await assetService.returnAsset(assetId, reason);

    res.redirect('/assets');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/* Render asset history page */
const renderAssetHistory = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await assetRepo.getAssetById(assetId);
    const history = await transactionRepo.getAssetHistory(assetId);

    res.render('assets/history', { asset, history });
  } catch (err) {
    res.status(500).send('Failed to load asset history');
  }
};


module.exports = {
  issueAsset,
  returnAsset,
  sendForService,
  assetHistory,
  renderAssetList,
  renderIssuePage,
  issueAssetUI,
  renderReturnPage,
  returnAssetUI,
  renderAssetHistory,
};
