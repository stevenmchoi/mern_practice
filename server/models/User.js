const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
});

// Create MongoDB model, and table in mLab to hold the models
mongoose.model('users', userSchema);
