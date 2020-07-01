import React from 'react';
import ForgotPassword from './forgot-password'
import { Link } from 'react-router-dom'

export default function PersonalizedHomePage(props) {
  return (
    <div className="App">
      <main>
            <h1>Home</h1>
            <div class="workout-btn">
              {/* Do I need these buttons? They are the same as in the Navbar */}
                <button class="button">Past Workouts</button>
                <button class="button">New Workout</button>
            </div>
            <div class="acct-info">
            <h2>Account Information</h2>
                <h3>Password</h3>
                <Link
                  to='/forgot-password'
                >
                  <button
                  >Change</button>
                </Link>
            </div>
        </main>
      {/* <ForgotPassword /> */}
    </div>
  );
}
