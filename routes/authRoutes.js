// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv')
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Local Authentication
router.post('/register', (req, res) => {
  // Register user with email and password
});

router.post('/login', (req, res) => {
  // Authenticate user with email and password
});

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Generate and send JWT
});

// Facebook Authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  // Generate and send JWT
});

// Microsoft Authentication
router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }));

router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/' }), (req, res) => {
  // Generate and send JWT
});

module.exports = router;
