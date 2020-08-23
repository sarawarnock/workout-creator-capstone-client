import React from 'react';
import { Link } from 'react-router-dom'

export default function PersonalizedHomePage(props) {
  return (
    <div className="App">
      <main>
            <h1>Home</h1>
            <div className="workout-btn">
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
        </main>
    </div>
  );
}
