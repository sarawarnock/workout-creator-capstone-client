import React, { Component } from 'react';
import SignUpForm from '../Components/sign-up-form';
import WorkOutContext from "../context";

export default class SignUpRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    static contextType = WorkOutContext;

    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/create-workout';
        this.context.setLoggedIn(true);
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