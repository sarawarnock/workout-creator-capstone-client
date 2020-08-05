import React from 'react';
import { Link } from 'react-router-dom'

export default function PersonalizedHomePage(props) {
  return (
    <div className="App">
      <main>
            <h1>Home</h1>
            <div className="workout-btn">
              {/* Do I need these buttons? They are the same as in the Navbar */}
                <button className="big-btn">
                  <Link to='/past-workouts'>
                    Past Workouts
                  </Link>
                </button>
                <button className="big-btn">
                  <Link to="/create-workout">
                    New Workout
                  </Link>
                </button>
            </div>
            <div className="acct-info">
            <h2>Account Information</h2>
                <h3>Email: </h3>
                <h3>Password: </h3>
                {/* <Link
                  to='/forgot-password'
                >
                  <button
                  >Change</button>
                </Link> */}
            </div>
        </main>
    </div>
  );
}
