const Category = require('./category.model');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Validate required fields
    if (!name || !description || !image) {
      return res.status(400).json({ 
        message: 'Name, description, and image are required fields' 
      });
    }

    // Validate image is a base64 string
    if (!image.startsWith('data:image')) {
      return res.status(400).json({ 
        message: 'Invalid image format. Image must be a base64 string' 
      });
    }

    const category = new Category(req.body);
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A category with this name already exists' 
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Validate image if provided
    if (req.body.image && !req.body.image.startsWith('data:image')) {
      return res.status(400).json({ 
        message: 'Invalid image format. Image must be a base64 string' 
      });
    }

    Object.assign(category, req.body);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'A category with this name already exists' 
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Soft delete category
exports.softDeleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.isActive = false;
    await category.save();
    res.json({ message: 'Category has been moved to deleted items' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete category
exports.hardDeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category has been permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};