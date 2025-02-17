require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/ndrf", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB is not connected
  });

// Define Schema
// const UserSchema = new mongoose.Schema({
//   organizationLicenseId: String,
//   organizationName: String,
//   hodName: String,
//   age: Number,
//   gender: String,
//   workLocation: String,
//   numTeams: Number,
//   userId: String,
//   password: String,
// });

// Create Model
const User = require("./models/User");

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) return res.status(400).json({ message: "User ID already exists" });

    const newUser = await User.create(req.body);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
