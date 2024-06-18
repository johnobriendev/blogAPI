
// const asyncHandler = require('express-async-handler');
// const passport = require('passport');

// exports.authenticate = asyncHandler((req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// });


const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

exports.authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});