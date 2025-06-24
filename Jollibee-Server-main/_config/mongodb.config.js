const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI
    const mongoURI = 'mongodb+srv://hedtjyuzon:mtuTZyacmmPoqD8F@jollibeedb.z88wf7z.mongodb.net/Jollibee_Database?retryWrites=true&w=majority&appName=JollibeeDB';
    
    const conn = await mongoose.connect(mongoURI, {
      // Increased timeouts for better stability
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      // Additional recommended options
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't crash the server in production
    if (process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
