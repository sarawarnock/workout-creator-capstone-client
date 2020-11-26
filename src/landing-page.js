import React from 'react';
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <main className="main">
        <h1>Workout Creator</h1>
        <div className="landing-text">
          <p>1. Create your own metabolic-conditioning workout</p>
          <p>2. Choose how long you want to workout for and the muscle groups you want to work, and we'll do the rest!</p>
        </div>
        </main>
    );
  }
}

// <p>To login: </p>
// <p>email: testuser@gmail.com</p>
// <p>password: Testpassword1</p>