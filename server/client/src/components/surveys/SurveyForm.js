// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

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
                    onSubmit={this.props.handleSubmit((values) =>
                        console.log(values)
                    )}
                >
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

SurveyForm = reduxForm({
    // a unique name for the form
    form: 'surveyForm',
})(SurveyForm);

export default SurveyForm;
