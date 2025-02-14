require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes'); // Import Auth Routes


// Initialize Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Connect Routes

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Load MongoDB URL from .env file

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Connection Error: ", err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Disaster Management Backend is Running!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
