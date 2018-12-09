const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// client ID:
// 154871975310-2td96d22d2cl9lrjsnfh8hh9lm56fpvm.apps.googleusercontent.com

// client secret:
// zak0hNV7PtCefCC2eoCXjfSS

// passport.use( new GoogleStrategy() );

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
