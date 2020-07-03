import React from 'react';
import ForgotPassword from './forgot-password'
import { Link } from 'react-router-dom'

export default function PersonalizedHomePage(props) {
  return (
    <div className="App">
      <main>
            <h1>Home</h1>
            <div className="workout-btn">
              {/* Do I need these buttons? They are the same as in the Navbar */}
                <button className="big-btn">Past Workouts</button>
                <button className="big-btn">New Workout</button>
            </div>
            <div className="acct-info">
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
