import React from 'react';

const SurveyFormReview = (props) => {
    // console.log(props);

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <button
                onClick={() => {
                    props.updateShowFormReview(false);
                }}
                className="red btn-flat white-text"
            >
                Cancel
            </button>
        </div>
    );
};

export default SurveyFormReview;
