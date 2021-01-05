import React, { Component } from 'react';
import LoginForm from '../Components/login-form';
import WorkOutContext from "../context";

export default class LoginRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/workouts';
        history.push(destination);
    }

    render() {
        return (
            <div className="form-container">
                <h2>Login</h2>
                <LoginForm 
                    onSubmitSuccess={this.handleSubmitSuccess}
                />
            </div>
        )
    }
}