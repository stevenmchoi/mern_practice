const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
// To store session in external database instead of cookie,
//   use 'express-session'
// https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/t/lecture/7603052
const passport = require('passport');
const keys = require('./config/keys.js');

require('./models/User');

require('./services/passport');

mongoose.connect(keys.mongoURI);

// Use express here and in authRoutes.js
const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // Listen on port 5000 in dev env
app.listen(PORT);
