const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        // Receive body from frontend
        const { title, subject, body, recipients } = req.body;

        const recipientArray = recipients.split(',').map((email) => ({
            email: email.trim(),
        }));

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipientArray,
            _user: req.user.id,
            dateSent: Date.now(),
        });

        // Send back to frontend
        res.send(survey);
    });
};
