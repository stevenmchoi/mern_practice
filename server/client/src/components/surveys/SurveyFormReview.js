import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {_.map(formFields, ({ label, name }) => (
                <div key={label}>
                    <label>{label}</label>
                    <div>{formValues[name]}</div>
                </div>
            ))}
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
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
