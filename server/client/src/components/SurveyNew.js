import React, { Component } from 'react';

class SurveyNew extends Component {
    render() {
        return (
            <div>
                <h3>Survey Title</h3>
                <input />
                <h3>Subject Line</h3>
                <input />
                <h3>Email Body</h3>
                <input />
                <h3>Recipient List</h3>
                <input />
                <div>
                    <button>Cancel</button>
                    <button>Next</button>
                </div>
            </div>
        );
    }
}

export default SurveyNew;
