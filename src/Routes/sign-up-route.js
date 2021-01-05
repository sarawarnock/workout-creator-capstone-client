import React, { Component } from 'react';
import SignUpForm from '../Components/sign-up-form';

export default class SignUpRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/create-workout';
        history.push(destination);
    }

    render() {
        return (
            <div className="form-container">
                <h2>Create Account</h2>
                <SignUpForm 
                    onSubmitSuccess={this.handleSubmitSuccess}
                />
            </div>
        );
    }
}