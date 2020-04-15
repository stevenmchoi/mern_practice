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
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice,
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                // Asynchronous, but it's all right because we don't
                //   have to send any response back
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: {
                                email,
                                responded: false,
                            },
                        },
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: {
                            'recipients.$.responded': true,
                            lastResponded: new Date(),
                        },
                    }
                ).exec();
            })
            .value();

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
