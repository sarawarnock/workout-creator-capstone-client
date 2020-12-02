import React, { Component } from 'react';
import AuthApiService from './services/auth-api-service-lf';

export default class LoginForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    state = { error: null };

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        const { username, password } = ev.target;
        AuthApiService.postLogin({
            email: username,
            password: password
        })
        .then(res => {
            username.value = '';
            password.value = '';
            this.props.onSubmitSuccess();
        })
        .catch(res => {
            this.setState({ error: res.error });
        });
    }

    render() {
        const { error } = this.state;
        return (
            <>
                <form
                    className="login-form"
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <div className="user-inp inp-cont">
                        <label className ="form-label" htmlFor="email">Username</label>
                        <input 
                            name="loginEmail"
                            type="text" 
                            id="email"
                            required
                        />
                    </div>
                    <div className="pass-inp inp-cont">
                        <label className ="form-label" htmlFor="password">Password</label>
                        <input 
                            name="loginPassword"
                            type="password" 
                            id="password"
                            required
                        />
                    </div>
                    <button className="submit" type="submit"> Log In </button>
                </form>
            </>
        )
    }
}