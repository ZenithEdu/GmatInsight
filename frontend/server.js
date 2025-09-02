const express = require('express');
const connectDB = require('./db');
require('dotenv').config({ path: './backend/.env' }); // env load

const app = express();

// yaha correct variable name use karo
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('GMAT Insight Server is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
