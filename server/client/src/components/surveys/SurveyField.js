// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { touched, error, warning } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
            {touched &&
                ((error && <span style={{ color: 'red' }}>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    );
};
