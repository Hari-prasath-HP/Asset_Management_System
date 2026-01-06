const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset_controller');

router.post('/issue', assetController.issueAsset);
router.post('/return', assetController.returnAsset);
router.post('/service', assetController.sendForService);
router.get('/api/history/:assetId', assetController.assetHistory);

// Assign 
router.get('/', assetController.renderAssetList);
router.get('/issue/:id', assetController.renderIssuePage);
router.post('/issue/:id', assetController.issueAssetUI);

// Return 
router.get('/return/:id', assetController.renderReturnPage);
router.post('/return/:id', assetController.returnAssetUI);

// History
router.get('/history/:id', assetController.renderAssetHistory);

module.exports = router;
