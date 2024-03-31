const express = require('express');
const passport = require('passport');
const configpassport = require('../config/passport.config');

const router = express.Router();

//actual routes implementation
//local
router.post('/login', passport.authenticate('local', (req, res) => {
    res.json({ message: 'Logged in successfully'});
}));

//google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login'}), ( req, res) => {
    res.redirect('/');
});

//facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

//Microsoft
router.get('/microsoft', passport.authenticate('microsoft', { scope: ['openid', 'email'] }));
router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
