const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, country, contact, education, program, sdg, org } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user with all fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      country,
      contact,
      education,
      program,
      sdg,
      org
    });

    await newUser.save();

    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({ 
      message: 'Login successful!',
      token,
      user: {
        name: user.name,
        email: user.email,
        country: user.country,
        contact: user.contact,
        education: user.education,
        program: user.program,
        sdg: user.sdg,
        org: user.org
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
