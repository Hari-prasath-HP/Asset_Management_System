const categoryRepo = require('../repositories/assetCategory_repository');

// Render category list page
const renderCategory=async(req, res)=>{
  try {
    const categories = await categoryRepo.getAllCategories();
    res.render('categories/list', { categories });
  } catch (error) {
    res.status(500).send('Failed to load categories');
  }
};

// Render add category page
const renderAddCategory=async(req, res)=>{
  try {
    res.render('categories/add');
  } catch (error) {
    res.redirect('/categories');
  }
};

// Add new category
const addCategory=async(req, res)=>{
  try {
    await categoryRepo.createCategory(req.body);
    res.redirect('/categories');
  } catch (error) {
    res.render('categories/add', {
      error: error.message,
      formData: req.body
    });
  }
};

// Render edit category page
const renderEdit=async(req, res)=>{
  try {
    const category = await categoryRepo.getCategoryById(req.params.id);
    res.render('categories/edit', { category });
  } catch (error) {
    res.redirect('/categories');
  }
};

// Update category
const updateCategory=async(req, res)=>{
  try {
    await categoryRepo.updateCategory(req.params.id, req.body);
    res.redirect('/categories');
  } catch (error) {
    res.render('categories/edit', {
      error: error.message,
      category: {
        id: req.params.id,
        ...req.body
      }
    });
  }
};

module.exports = {
  renderCategory,
  renderAddCategory,
  addCategory,
  renderEdit,
  updateCategory
};
