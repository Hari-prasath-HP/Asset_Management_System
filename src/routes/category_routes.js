const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category_controller');

// Category list
router.get('/', categoryController.renderCategory);

// Add category
router.get('/add', categoryController.renderAddCategory);
router.post('/add', categoryController.addCategory);

// Edit category
router.get('/edit/:id', categoryController.renderEdit);
router.post('/edit/:id', categoryController.updateCategory);

module.exports = router;
