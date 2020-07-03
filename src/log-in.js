import React from 'react';
import { Link  } from 'react-router-dom'
import ValidationError from './validation-error'

export default class Login extends React.Component {
  state = {
    error: null,
    loginEmail: {
      value: '',
      touched: false
    },
    loginPassword: {
      value: '',
      touched: false
    },
    errors: {
      loginEmail: 'You must enter a valid email',
      loginPassword: 'You must enter a valid password',
    }
}

  // formatQueryParams(params) {
  //   const queryItems = Object.keys(params)
  //       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  //   return queryItems.join('&')
  // }

  updateEmail(email) {
    this.setState({ loginEmail: {value: email, touched: true } })
  }

  updatePassword(password) {
    this.setState({ loginPassword: { value: password, touched: true } })
  }

  validateEmail(inputEmail) {
    if (inputEmail == undefined) {
       inputEmail = this.state.loginEmail.value.trim();
    }
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputEmail.match(mailFormat)) {
      return 'Valid email is required'
    } return ' '
  }

  validatePassword(inputPassword) {
    if (inputPassword == undefined) {
      inputPassword = this.state.loginPassword.value.trim();
   }
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if (!inputPassword.match(passwordFormat)) {
      return 'Valid password is required'
    } return ' '
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //create an object to store the search filters
    const data = {}

    //get all the from data from the form component
    const formData = new FormData(e.target)

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
        data[value[0]] = value[1]
    }
    console.log(data)
    let {loginEmail, loginPassword} = data
  
    if (this.validateEmail(loginEmail) === '') {
      this.setState({
          error: 'email is not valid'
      })
    }
    if (this.validatePassword(loginPassword) === '') {
      this.setState({
          error: 'password is not valid'
      })
    }
    //assigning the object from the form data to params in the state
    // this.setState({
    //     loginEmail.value: data.loginEmail,
    //     loginPassword.value: data.loginPassword
    // })

    //check if the state is populated with the search params data
    console.log(this.state)

    const searchURL = `${config.API_ENDPOINT}/log-in`

    const queryString = this.formatQueryParams(data)

     //sent all the params to the final url
    const url = searchURL + '?' + queryString

    console.log(url)

    const options = {
      method: 'GET',
      header: {
          "Authorization": "",
          "Content-Type": "application/json"
      }
  }

  //useing the url and paramters above make the api call
  fetch(url, options)

      // if the api returns data ...
      .then(res => {
          if (!res.ok) {
              throw new Error('Something went wrong, please try again later.')
          }
           // ... convert it to json
           return res.json()
      })
          // use the json api output
      .then(data => {

        //check if there is meaningfull data
        console.log(data);
        // check if there are no results
        if (data.totalItems === 0) {
          throw new Error('No user found')
      }

    })
      .catch(err => {
        this.setState({
          error: err.message
      })
    })
  }

  render() {
    const emailError = this.validateEmail();
    const passwordError = this.validatePassword();
    return (
      <div className="App">
        <main>
            <h1>Log In</h1>
                <form 
                  className="login-form"
                  onSubmit={this.handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input 
                      name="loginEmail"
                      type="text" 
                      id="email"
                      placeholder="Email"
                      onChange={e => this.updateEmail(e.target.value)}
                      required
                    />
                    {this.state.loginEmail.touched && <ValidationError message={emailError} />}
                    
                    <label htmlFor="password">Password</label>
                    <input 
                      name="loginPassword"
                      type="text" 
                      id="password"
                      placeholder="Password"
                      onChange={e => this.updatePassword(e.target.value)}
                      required
                    /> 
                    {this.state.loginPassword.touched && <ValidationError message={passwordError} />}
                    <button 
                  className="small-btn"
                  type="submit"
                >
                  Log In
                </button>
                </form>
                <div>
                    <h2>Don't have an account yet?</h2>
                    <Link
                      to='/sign-up'
                    >
                      <button 
                        className="small-btn"
                      >Sign Up</button>
                    </Link>
                </div>
        </main>
      </div>
    );
  }
}
