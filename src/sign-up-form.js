import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from './services/auth-api-service-lf';

export default class SignUpForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static = { error: null };

    handleSubmit = ev => {
        ev.preventDefault();
        const { signUpEmail, signUpPassword, signUpFirstName } = ev.target;
        this.setState({ error: null });
        const newUser = {
            signUpEmail: signUpEmail.value,
            signUpPassword: signUpPassword.value,
            signUpFirstName: signUpFirstName.value
        }
        AuthApiService.postUser(newUser)
        .then(res => {
            AuthApiService.postLogin({
                email: signUpEmail.value,
                password: signUpPassword.value,
                first_name: signUpFirstName.value
            })
            .then(user => {
                signUpEmail.value = ''
                signUpPassword.value = ''
                signUpFirstName.value = ''
                this.props.onSubmitSuccess()
            })
        })
        .catch(res => {
            this.setState({ error: res.error })
        });
    }

    render() {
        // const { error } = this.state;
        return (
            <>
                <form
                    className="sign-up-form"
                    onSubmit={this.handleSubmit}
                >
                    {/* <div role='alert'>{error && <p className='error'>{error}</p>}</div> */}
                    <div className="sign-up-email">
                        <label className ="user-label" htmlFor="email">Username</label>
                        <input 
                            name="signUpEmail"
                            type="text" 
                            id="email" 
                            required
                        />
                    </div>
                    <div className="sign-up-password">
                        <label className ="user-label" htmlFor="password">Password (one capital letter and one number needed)</label>
                        <input 
                            name="signUpPassword"
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            required
                        /> 
                    </div>
                    <div className="sign-up-name">
                        <label className ="user-label" htmlFor="fname">First Name</label>
                        <input 
                            name="signUpFirstName"
                            type="text" 
                            id="fname" 
                            placeholder="First Name"
                            required
                        /> 
                    </div>
                    <button className="small-btn" type="submit">Register</button>
                </form>
                <div>
                    <h3>Already have an account?</h3>
                    <Link className="link"
                        to='/login'>
                    Login
                    </Link>
                </div>
            </>
        )
    }
}