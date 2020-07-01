import React from 'react';
import { Link  } from 'react-router-dom'

export default class Login extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state
    //POST request to API endpoint
    //Auth service/ 
  }

  render() {
    return (
      <div className="App">
        <p>Login</p>
        <main>
            <h1>Log In</h1>
                <form 
                  class="login-form"
                  onSubmit={this.handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input 
                      type="text" 
                      id="email"
                      placeholder="Email"
                      required
                    />
                    <p class="error-msg">Email is not valid.</p>
                    
                    <label htmlFor="password">Password</label>
                    <input 
                      type="text" 
                      id="password"
                      placeholder="Password"
                      required
                    /> 
                    <p className="error-msg">Password is not valid.</p>
                </form>
                <button 
                  className="small-btn"
                  type="submit"
                >
                  Log In
                </button>
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
