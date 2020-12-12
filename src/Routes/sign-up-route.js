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
        console.log('running habndleSubmitSuccess');
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/home';
        history.push(destination);
    }

    render() {
        return (
            <>
                <section className="sign-up-section">
                    <h2>Create Account</h2>
                    <SignUpForm 
                        onSubmitSuccess={this.handleSubmitSuccess}
                    />
                </section>
            </>
        );
    }
}