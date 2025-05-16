const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmap';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message || 'Unknown error'}`);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ CORS preflight support
app.options('*', cors());

// ✅ JSON parsing
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('CORS test successful!');
});

// ✅ Example POST route
app.post('/api/auth/login', (req, res) => {
  console.log('Login request received');
  res.json({ message: 'Login successful' });
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
