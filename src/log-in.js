import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="App">
        <p>Login</p>
        <main>
            <h1>Log In</h1>
                <form class="login-form">
                    <label for="email">Email</label>
                    <input 
                      type="text" 
                      id="email"
                      placeholder="Email"
                      required
                    />
                    <p class="error-msg">Email is not valid.</p>
                    
                    <label for="password">Password</label>
                    <input 
                      type="text" 
                      id="password"
                      placeholder="Password"
                      required
                    /> 
                    <p class="error-msg">Password is not valid.</p>
                </form>
                <button class="small-btn">Log In</button>
                <div>
                    <h2>Don't have an account yet?</h2>
                    <button class="small-btn">Sign Up</button>
                </div>
        </main>
      </div>
    );
  }
}
