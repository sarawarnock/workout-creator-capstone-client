import React from 'react';
import { Link } from 'react-router-dom'
import ErrorBoundary from './error-boundary'
import ValidationError from './validation-error'
import AuthApiService from './services/auth-api-service'
import TokenService from './services/token-service'

export default class SignUp extends React.Component {
  state = {
      error: null,
      signUpEmail: {
        value: '',
        touched: false
      },
      signUpPassword: {
        value: '',
        touched: false
      },
      signUpFirstName: {
        value: '',
        touched: false
      },
      errors: {
        signUpEmail: 'You must enter a valid username',
        signUpPassword: 'You must enter a valid password',
        signUpFirstName: 'You must enter a valid name'
      },
      sessionUser: ''
  }

  updateEmail(email) {
    this.setState({ signUpEmail: {value: email, touched: true } })
  }

  updatePassword(password) {
    this.setState({ signUpPassword: { value: password, touched: true } })
  }

  updateFirstName(firstName) {
    this.setState({ signUpFirstName: { value: firstName, touched: true } })
  }

  updateSessionUser(userId) {
    this.setState({
      sessionUser: userId
    })
  }

  validateEmail(inputEmail) {
    if (inputEmail == undefined) {
       inputEmail = this.state.signUpEmail.value.trim();
    }
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputEmail.match(mailFormat)) {
      return 'Valid username is required'
    } return ' '
  }

  validatePassword(inputPassword) {
    if (inputPassword == undefined) {
      inputPassword = this.state.signUpPassword.value.trim();
   }
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if (!inputPassword.match(passwordFormat)) {
      return 'Valid password is required'
    } return ' '
  }

  validatateFirstName(inputFirstName) {
    if (inputFirstName == undefined) {
      inputFirstName = this.state.signUpFirstName.value.trim();
   }
    const nameFormat = /^[a-zA-Z\-]+$/;
    if (!inputFirstName.match(nameFormat)) {
      return 'Name needs to be more than 2 characters'
    } return ' '
  }

handleSubmit = (event) => {
  event.preventDefault();
  const { signUpEmail, signUpPassword, signUpFirstName } = event.target;
  console.log('email:', signUpEmail.value, 'password:', signUpPassword.value);
  this.setState({ error: null })
  AuthApiService.postUser({
      email: signUpEmail.value,
      password: signUpPassword.value,
      first_name: signUpFirstName.value
  })

  .then(response => {
      console.log('email:', response)
      signUpEmail.value = ''
      signUpPassword.value = ''
      //TokenService.saveAuthToken(response.authToken)
      TokenService.saveUserId(response.id)
      TokenService.saveUserName(response.first_name)
      this.updateSessionUser(response.id)
      window.location = `/login`
  }) 

  .catch(res => {
      this.setState({ error: res.error })
  })  
}

  render() {
    const emailError = this.validateEmail();
    const passwordError = this.validatePassword();
    const nameError = this.validatateFirstName();
    return (
      <ErrorBoundary>
      <div className="App">
        <main>
            <h1>Sign Up</h1>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                
                    <div className="sign-up-email">
                    <label className ="user-label" htmlFor="email">Username</label>
                    <input 
                      name="signUpEmail"
                      type="text" 
                      id="email" 
                      required
                      onChange={e => this.updateEmail(e.target.value)}
                    />
                    {this.state.signUpEmail.touched && <ValidationError message={emailError} />}
                    </div>
                    <div className="sign-up-password">
                    <label className ="user-label" htmlFor="password">Password (one capital letter and one number needed)</label>
                    <input 
                      name="signUpPassword"
                      type="password" 
                      id="password" 
                      placeholder="Password"
                      required
                      onChange={e => this.updatePassword(e.target.value)}
                    /> 
                    {this.state.signUpPassword.touched && <ValidationError message={passwordError} />}
                    </div>
                    <div className="sign-up-name">
                    <label className ="user-label" htmlFor="fname">First Name</label>
                    <input 
                      name="signUpFirstName"
                      type="text" 
                      id="fname" 
                      placeholder="First Name"
                      required
                      onChange={e => this.updateFirstName(e.target.value)}
                    /> 
                    {this.state.signUpFirstName.touched && <ValidationError message={nameError} />}
                    </div>
                    <button className="small-btn" type="submit">Sign Up!</button>
                </form>
                <div>
                    <h3>Already have an account?</h3>
                    <button
                    className="small-btn">
                      <Link
                        to='/login'>
                      Login
                      </Link>
                    </button>
                </div>
        </main>
      </div>
      </ErrorBoundary>
    );
  }
}
