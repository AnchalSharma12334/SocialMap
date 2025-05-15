require('dotenv').config();          // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware


app.use(cors(corsOptions));                  // Allow cross-origin requests from frontend
app.options('*', cors(corsOptions));
app.use(express.json());            // Parse JSON request bodies

// Import your routes
const authRoutes = require('./src/routes/authRoutes');

// Use routes with base path
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
