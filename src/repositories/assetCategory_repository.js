const { AssetCategory } = require('../models');

// New Category
const createCategory = async (categoryData) => {
  return AssetCategory.create(categoryData);
};

// By Name
const getAllCategories = async () => {
  return AssetCategory.findAll({
    order: [['name', 'ASC']]
  });
};

// By ID
const getCategoryById = async (id) => {
  return AssetCategory.findByPk(id);
};

// Update Details
const updateCategory = async (id, updateData) => {
  return AssetCategory.update(updateData, {
    where: { id }
  });
};

// Delete 
const deleteCategory = async (id) => {
  return AssetCategory.destroy({
    where: { id }
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
