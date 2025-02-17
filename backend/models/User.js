const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  organizationLicenseId: { type: String, required: true }, // Organization License ID
  organizationName: { type: String, required: true }, // Organization Name
  hodName: { type: String, required: true }, // Head of Department Name
  age: { type: Number, required: true, min: 18, max: 100 }, // Age (Valid range: 18-100)
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true }, // Gender (Dropdown values)
  workLocation: { type: String, required: true }, // Work Location
  numTeams: { type: Number, required: true, min: 1 }, // Number of Teams (Must be at least 1)
  userId: { type: String, required: true, unique: true, minlength: 8 }, // Unique User ID (Min length: 8)
  password: { type: String, required: true, minlength: 8 }, // Password (Min length: 8)
  createdAt: { type: Date, default: Date.now } // Auto-generated timestamp
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
