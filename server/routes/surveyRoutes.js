const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
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
        const events = _.map(req.body, ({ email, url }) => {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if (match) {
                return {
                    email,
                    surveyId: match.surveyId,
                    choice: match.choice,
                };
            }
        });

        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        console.log('uniqueEvents :', uniqueEvents);

        res.send({});
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
