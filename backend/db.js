const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); 

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
