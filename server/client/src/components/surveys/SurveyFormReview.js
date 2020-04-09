import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = _.map(formFields, ({ label, name }) => (
        <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
        </div>
    ));

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps({
    form: {
        surveyForm: { values },
    },
}) {
    return { formValues: values };
}

export default connect(mapStateToProps)(SurveyFormReview);
