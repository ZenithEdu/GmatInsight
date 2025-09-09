const express = require('express');
const connectDB = require('./db');
require('dotenv').config({ path: './.env' });
const cors = require('cors');

// Import routers
const verbalVaultRoutes = require('./routes/verbalVaultRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const quantVaultRoutes = require('./routes/quantVaultRoutes');
// Admin auth routes
const adminAuthRoutes = require('./routes/adminAuthRoutes');


const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT;

app.use(express.json());

// Debug: log incoming POST bodies for troubleshooting
app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log("Incoming POST to", req.originalUrl, "body:", req.body);
  }
  next();
});

// Connect MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('GMAT Insight Server is running');
});

// Use routers
app.use('/api/verbalVault', verbalVaultRoutes);
app.use('/api/quantVault', quantVaultRoutes);
app.use('/api/assessments', assessmentRoutes);


// admin auth routes
app.use('/api/admin', adminAuthRoutes);


// Catch-all for undefined API routes (404)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});