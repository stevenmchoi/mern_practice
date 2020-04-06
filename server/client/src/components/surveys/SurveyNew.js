// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    constructor(props) {
        super(props);

        this.updateShowFormReview = this.updateShowFormReview.bind(this);
        this.updateSurveyState = this.updateSurveyState.bind(this);
    }

    state = { showFormReview: false, survey: {} };

    updateShowFormReview(bool) {
        if (!this.state.showFormReview) {
            this.setState({ showFormReview: bool });
        }
    }

    updateSurveyState(values) {
        this.setState({ survey: values });
    }

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    updateShowFormReview={this.updateShowFormReview}
                    updateSurveyState={this.updateSurveyState}
                ></SurveyFormReview>
            );
        }

        return (
            <SurveyForm
                updateShowFormReview={this.updateShowFormReview}
                updateSurveyState={this.updateSurveyState}
            ></SurveyForm>
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default SurveyNew;
