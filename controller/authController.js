const passport = require('passport');
const User = require('../models/userModel');

//Local strategy
const localStrategy = async (email, password, done) => {
try {
    const user = await User.findOne ({ email });
    if(!user) {
        return done(null, false, { message: 'Incorrect email or password' });
    }
    const isMatch = await User.comparePassword(password);
    if(!isMatch) {
        return done(null, false, { message: 'Incorrect email and password' });
    }
    return done(null, user);
    } catch(error) {
        return done(error);
    }
};

//Google strategy
const googleStrategy = async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id});
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
    } catch (error) {
        return done(error);
    }
};

//Facebook strategy
const facebookStrategy = async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ facebookId: profile.id});
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            facebookId: profile.id,
            email: profile.emails[0].value
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
    } catch (error) {
        return done(error);
    }
};

//Microsoft strategy
const microsoftStrategy = async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ microsoftId: profile.id});
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            microsoftId: profile.id,
            email: profile.emails[0].value
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
    } catch (error) {
        return done(error);
    }
};

module.exports = {
    localStrategy,
    googleStrategy,
    facebookStrategy,
    microsoftStrategy
};
