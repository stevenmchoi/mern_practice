const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log('req.body :', req.body);
        res.send(req.body);
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // Receive body from frontend
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email) => ({
                email: email.trim(),
            })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            // Send back to frontend
            await mailer.send();

            // Save survey to database
            await survey.save();

            // Deduct one credit
            req.user.credits--;

            // Grab updated user
            const user = await req.user.save();

            // Send back the updated user object to update the header
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
