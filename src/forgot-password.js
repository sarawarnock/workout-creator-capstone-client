import React from 'react';

export default class ForgotPassword extends React.Component {
  
  //Need a POST request here to post new password

  render() {
    return (
      <div className="App">
        <main class="main">
              <h1>Forgot Password</h1>
              <form>
                <label for="new-password">New Password</label>
                <input id="new-password" type="text" />
                <p class="error-msg">Password is not valid.</p>
             
                <label for="repeat-password">Repeat New Password</label>
                <input id="repeat-password" type="text" />
                <p class="error-msg">Passwords don't match</p>
        
                <button>Submit</button>
              </form>
          </main>
      </div>
    );
  }
}
