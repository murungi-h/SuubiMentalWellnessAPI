const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/userModel');
require('dotenv')

module.exports = function(passport) {
  // JWT Strategy
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.secretOrKey;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          // Find the user by email
          const user = await User.findOne({ email });

          // If user not found
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // Verify the password
          const isMatch = await user.comparePassword(password);

          // If password is incorrect
          if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          // Return the user if everything is valid
          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/api/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create the user
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              // Add any other required fields
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/api/auth/facebook/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create the user
          let user = await User.findOne({ facebookId: profile.id });

          if (!user) {
            user = new User({
              facebookId: profile.id,
              email: profile.emails[0].value,
              // Add any other required fields
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  // Microsoft Strategy
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: keys.microsoftClientID,
        clientSecret: keys.microsoftClientSecret,
        callbackURL: '/api/auth/microsoft/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create the user
          let user = await User.findOne({ microsoftId: profile.id });

          if (!user) {
            user = new User({
              microsoftId: profile.id,
              email: profile.emails[0].value,
              // Add any other required fields
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
