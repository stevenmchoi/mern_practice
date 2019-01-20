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

		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id })
						.save() // Saved to MongoDB
						.then((user) => done(null, user));
				}
			});
		}
	)
);

// After creating/finding User in DB, pass from server the User ID
//   associated with the DB, NOT the Google profile ID
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// When checking an action by a User, check its User ID and return User itself
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});
