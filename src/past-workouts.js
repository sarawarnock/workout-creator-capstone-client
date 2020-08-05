import React from 'react';
import { Link } from 'react-router-dom'
import CircleButton from './CircleButton/circle-button'

export default function PastWorkouts(props) {
  return (
    <div className="App">
      <main className="main">
            <h1>Past Workouts</h1>
            <table className="workouts-table">
              <thead>
                <tr>
                    <th className="tb-name">Name</th>
                    <th className="tb-date">Date</th>
                    <th className="tb-view">View Workout</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Example Name: Workout 1</td>
                    <td>March 21, 2020</td>
                    {/* This button will link to the ViewPastWorkout
                    component, depending on the workout_id */}
                    <td>
                      {/* Need to use props? to get the workout details down in the view-past-workout
                      button  */}
                        <button>
                          <Link
                            to="/past-workouts/:workout_id"
                          >
                            View
                          </Link>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <Link
              to='/create-workout'
            >
              <button>Create Workout</button>
            </Link>
            <div>
              <CircleButton onClick={props.history.goBack}>
                Go Back
              </CircleButton>
            </div>
        </main>
    </div>
  );
}
