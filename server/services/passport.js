const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true, // Use 'https' for Heroku proxy calls
		},

		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			// If old User
			if (existingUser) {
				return done(null, existingUser);
			}

			// If new User, create/save new User to MongoDB
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);

// After creating/finding User in DB, pass from server the User ID
//   associated with the DB, NOT the Google profile ID
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// When checking an action by a User, check its User ID and return User itself
passport.deserializeUser(async (id, done) => {
	// Check if User exists in MongoDB
	const user = await User.findById(id);
	done(null, user);
});
