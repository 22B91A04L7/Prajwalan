require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");

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

// Registration Route
app.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { userId, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) return res.status(400).json({ message: "User ID already exists" });

    // Hash Password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ message: "Invalid User ID" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
