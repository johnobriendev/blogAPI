const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// User login
exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, admin: user.admin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


exports.logoutUser = asyncHandler(async (req, res) => {
  // Typically, no action needed on the server side for JWT logout
  res.status(200).json({ message: 'Logout successful' });
});