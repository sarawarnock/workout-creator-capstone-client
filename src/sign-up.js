import React from 'react';

export default class SignUp extends React.Component {
  state = {
      error: null,
      params: {
        email: '',
        password: '',
        first_name: '',
      }
  }

  validateEmail(inputEmail) {
    let outputEmail = inputEmail;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!inputEmail.match(mailformat)) {
        outputEmail = ''
    }
    return outputEmail
  }

  validatePassword(inputPassword) {
    let outputPassword = inputPassword;
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters that are letters, numbers or the underscore
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if(!inputPassword.match(passwordformat)) {
        outputPassword = ''
    }
    return outputPassword
  }

  validatateFirstName(inputFirstName) {
    let outputFirstName = inputFirstName;
    //just usind the same one here, although I would ideally change it
    let firstNameFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    if(!inputFirstName.match(firstNameFormat)) {
      outputFirstName = ''
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const data = {}
    const formData = new FormData(ev.target)

    for (let value of formData) {
      data[value[0]] = value[1]
    }

    let { email, password, first_name } = data
    if (this.validateEmail(email) === '') {
      this.setState({
          error: 'email is not valid'
      })
    }

    if (this.validatePassword(password) === '') {
      this.setState({
          error: 'password is not valid'
      })
    }

    if (this.validatateFirstName(first_name) === '') {
      this.setState({
        error: 'first name is not valid'
      })
    }

    this.setState({
      params: data
    })

    //make sure the state gets populated with the input data
    console.log(this.state.params)
  }

  render() {
    const errorMessage = this.state.error ? <p className="error-message">{this.state.error}</p> : false
    return (
      <div className="App">
        <p>Sign Up</p>
        <main>
            <h1>Sign Up</h1>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                  {errorMessage}
                    <div>
                    <label for="email">Email</label>
                    <input 
                      type="text" 
                      id="email" 
                      placeholder="Email"
                      required
                    />
                    <p className="error-msg">Email is not valid.</p>
                    </div>
                    <div>
                    <label for="password">Password</label>
                    <input 
                      type="text" 
                      id="password" 
                      placeholder="Password"
                      required
                    /> 
                    <p className="error-msg">Password is not valid.</p>
                    </div>
                    <div>
                    <label for="fname">First Name</label>
                    <input 
                      type="text" 
                      id="fname" 
                      placeholder="First Name"
                      required
                    /> 
                    <p className="error-msg">Name is not valid.</p>
                    </div>
                </form>
                <button className="small-btn" type="Submit">Sign Up!</button>
                <div>
                    <h2>Already have an account?</h2>
                    <button className="small-btn">Sign In</button>
                </div>
        </main>
      </div>
    );
  }
}
