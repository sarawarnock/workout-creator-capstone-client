import React from 'react';
import Login from './log-in'
import SignUp from './sign-up'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="App">
        <p>Landing Page</p>
        <Login />
        <SignUp />
        <main className="main">
          <h1>Workout Creator</h1>
            <p>Create your own metabolic-conditoning workout</p>
            <p>Choose how long you want to workout for and the muscle groups you want to work, and we'll do the rest!</p>
          <button>Sign Up</button>
          <button>Log In</button>
        </main>
      </div>
    );
  }
}