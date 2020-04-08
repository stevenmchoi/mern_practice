// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validEmails from '../../utils/validateEmails';

const FIELDS = [
    {
        label: 'Survey Title',
        name: 'title',
    },
    {
        label: 'Survey Line',
        name: 'subject',
    },
    {
        label: 'Email Body',
        name: 'body',
    },
    {
        label: 'Recipient List',
        name: 'emails',
    },
];

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                {_.map(FIELDS, ({ label, name }) => (
                    <Field
                        key={name}
                        component={SurveyField}
                        type="text"
                        label={label}
                        name={name}
                    />
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validEmails(values.emails || '');

    _.each(FIELDS, ({ name }) =>
        !values[name] ? (errors[name] = `You must provide a value`) : null
    );

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);
