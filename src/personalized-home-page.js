import React from 'react';
import ForgotPassword from './forgot-password'

export default function PersonalizedHomePage(props) {
  return (
    <div className="App">
      <p>Personalized Home Page</p>
      <main>
            <h1>Home</h1>
            <div class="workout-btn">
                <button class="button">Past Workouts</button>
                <button class="button">New Workout</button>
            </div>
            <div class="acct-info">
            <h2>Account Information</h2>
                <h3>Password</h3>
                <button>Change</button>
            </div>
        </main>
      <ForgotPassword />
    </div>
  );
}
