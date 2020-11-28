import React, { Component } from 'react';
// import Login from './log-in';
import LoginForm from './login-form';

export default class LoginRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }
 
    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/';
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