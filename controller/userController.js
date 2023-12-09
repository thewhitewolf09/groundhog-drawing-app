const User = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
  
      res.cookie('token', token, { httpOnly: true });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
  };
  

  exports.getUserProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.updateUserProfile = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, { username, email }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
