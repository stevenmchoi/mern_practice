import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    render() {
        return (
            <div>
                {this.props.surveys.map(
                    ({ title, subject, body, yes, no, dateSent }) => {
                        return (
                            <div key={dateSent}>
                                <div key="title">
                                    <label>Title</label>
                                    <div>{title}</div>
                                </div>
                                <div key="subject">
                                    <label>Subject</label>
                                    <div>{subject}</div>
                                </div>
                                <div key="body">
                                    <label>Body</label>
                                    <div>{body}</div>
                                </div>
                                <div key="yes">
                                    <label>Yes</label>
                                    <div>{yes}</div>
                                </div>
                                <div key="no">
                                    <label>No</label>
                                    <div>{no}</div>
                                </div>
                                <div key="dateSent">
                                    <label>Date Sent</label>
                                    <div>{dateSent}</div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
