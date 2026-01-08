const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset_controller');

// API routes (JSON responses)
router.post('/issue', assetController.issueAsset);
router.post('/return', assetController.returnAsset);
router.post('/service', assetController.sendForService);
router.get('/api/history/:assetId', assetController.assetHistory);

// Add asset
router.get('/add', assetController.getAddAssetPage);
router.post('/add', assetController.createAsset);

// Asset list
router.get('/', assetController.renderAssetList);

// Issue asset
router.get('/issue/:id', assetController.renderIssuePage);
router.post('/issue/:id', assetController.issueAssetUI);

// Return asset
router.get('/return/:id', assetController.renderReturnPage);
router.post('/return/:id', assetController.returnAssetUI);

// Asset history
router.get('/history/:id', assetController.renderAssetHistory);

// Edit asset
router.get('/edit/:id', assetController.editAsset);
router.post('/edit/:id', assetController.updateAsset);

// Stock view
router.get('/stock', assetController.renderStockView);

module.exports = router;
