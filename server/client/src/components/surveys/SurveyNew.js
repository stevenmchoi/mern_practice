// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showFormReview: false, survey: {} };

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                ></SurveyFormReview>
            );
        }

        return (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
            ></SurveyForm>
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default SurveyNew;
