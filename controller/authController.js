// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/keys');
const { generateJWT } = require('../config/passport');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.googleAuth = async (req, res) => {
  // Redirect to client with token or handle as necessary
  const token = generateJWT(req.user);
  res.json({ token });
};

exports.facebookAuth = async (req, res) => {
  // Redirect to client with token or handle as necessary
  const token = generateJWT(req.user);
  res.json({ token });
};

exports.microsoftAuth = async (req, res) => {
  // Redirect to client with token or handle as necessary
  const token = generateJWT(req.user);
  res.json({ token });
};
