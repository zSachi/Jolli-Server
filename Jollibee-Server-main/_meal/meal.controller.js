const Meal = require('./meal.model');

// Get all meals
exports.getMeals = async (req, res) => {
  try {
    // Check if the request is from admin panel
    const isAdmin = req.query.isAdmin === 'true';
    
    let query = isAdmin ? {} : { isDeleted: false };
    
    const meals = await Meal.find(query)
      .populate('category', 'name');
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get meals by category
exports.getMealsByCategory = async (req, res) => {
  try {
    const meals = await Meal.find({ 
      category: req.params.categoryId,
      isDeleted: false,
      isAvailable: true 
    }).populate('category', 'name');
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single meal
exports.getMeal = async (req, res) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate('category', 'name');
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create meal
exports.createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update meal
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    Object.assign(meal, req.body);
    const updatedMeal = await meal.save();
    res.json(updatedMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft delete meal
exports.softDeleteMeal = async (req, res) => {
  try {
    console.log('Attempting soft delete for meal:', req.params.id);
    const meal = await Meal.findById(req.params.id);
    
    if (!meal) {
      console.log('Meal not found for soft delete:', req.params.id);
      return res.status(404).json({ message: 'Meal not found' });
    }

    meal.isDeleted = true;
    meal.isAvailable = false;  // Set availability to false when deleted
    await meal.save();
    console.log('Meal soft deleted successfully:', req.params.id);
    res.json({ message: 'Meal soft deleted successfully' });
  } catch (error) {
    console.error('Error in soft delete:', error);
    res.status(500).json({ message: error.message });
  }
};

// Hard delete meal
exports.hardDeleteMeal = async (req, res) => {
  try {
    console.log('Attempting hard delete for meal:', req.params.id);
    const meal = await Meal.findByIdAndDelete(req.params.id);
    
    if (!meal) {
      console.log('Meal not found for hard delete:', req.params.id);
      return res.status(404).json({ message: 'Meal not found' });
    }

    console.log('Meal hard deleted successfully:', req.params.id);
    res.json({ message: 'Meal permanently deleted successfully' });
  } catch (error) {
    console.error('Error in hard delete:', error);
    res.status(500).json({ message: error.message });
  }
};