const { AssetCategory } = require('../models');

// Create new asset category
const createCategory=async(data)=>{
  try {
    const { name, description } = data;
    if (!name) {
      throw new Error('Category name is required');
    }
    const existingCategory = await AssetCategory.findOne({
      where: { name: name }
    });
    if (existingCategory) {
      throw new Error('Category already exists');
    }
    const category = await AssetCategory.create({
      name: name,
      description: description
    })
    return category;
  } catch (error) {
    throw error;
  }
};

// Get all categories
const getAllCategories=async()=>{
  try {
    const categories = await AssetCategory.findAll({
      order: [['id', 'ASC']]
    });

    return categories;
  } catch (error) {
    throw error;
  }
};

// Get category by id
const getCategoryById=async(categoryId)=>{
  try {
    const category = await AssetCategory.findByPk(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
};

// Update category details
const updateCategory=async(categoryId,data)=>{
  try {
    const result = await AssetCategory.update(data, {
      where: { id: categoryId }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
};
