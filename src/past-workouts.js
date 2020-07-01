import React from 'react';
import ViewPastWorkout from './view-past-workout'
import { Link } from 'react-router-dom'

export default function PastWorkouts(props) {
  return (
    <div className="App">
      <main class="main">
            <h1>Past Workouts</h1>
            <table className="workouts-table">
                <tr>
                    <th className="tb-name">Name</th>
                    <th className="tb-date">Date</th>
                    <th className="tb-view">View Workout</th>
                </tr>
                <tr>
                    <th>Example Name: Workout 1</th>
                    <th>March 21, 2020</th>
                    {/* This button will link to the ViewPastWorkout
                    component, depending on the workout_id */}
                    <th>
                        <button>View</button>
                    </th>
                </tr>
            </table>
            <Link
              to='/create-workout'
            >
              <button>Create Workout</button>
            </Link>
        </main>
      <ViewPastWorkout />
    </div>
  );
}
