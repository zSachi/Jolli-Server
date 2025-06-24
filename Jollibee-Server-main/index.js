const express = require('express');
const cors = require('cors');
const connectDB = require('./_config/mongodb.config');

// Import routes
const categoryRoutes = require('./_category/category.route');
const mealRoutes = require('./_meal/meal.route');
const userRoutes = require('./_user/user.route');

const app = express();

// Connect to MongoDB
connectDB().catch(console.error); // Don't let connection errors crash the server

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Don't send stack traces in production
  const error = process.env.NODE_ENV === 'production' 
    ? { message: 'Internal Server Error' }
    : { message: err.message, stack: err.stack };
    
  res.status(500).json(error);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
