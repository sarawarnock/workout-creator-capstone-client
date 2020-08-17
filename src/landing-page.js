import React from 'react';
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="App">
        <main className="main">
          <h1>Workout Creator</h1>
            <p>Create your own metabolic-conditoning workout</p>
            <p>Choose how long you want to workout for and the muscle groups you want to work, and we'll do the rest!</p>
          <button className="big-btn"> <Link to='/sign-up'> Sign Up </Link>
          </button>
          <button className="big-btn"> <Link to='/login'> Login</Link> </button>
          <p>To login: </p>
            <p>email: testuser@gmail.com</p>
            <p>password: Testpassword1</p>
        </main>
      </div>
    );
  }
}