import React from 'react';
import { Link } from 'react-router-dom'

export default function PastWorkouts(props) {
  if (props.appSavedWorkouts.length === 0) {
    return 'Sorry, no workouts to display!'
  } else
  return (
    <div className="App">
      <main className="main">
            <h1>Past Workouts</h1>
            <table className="workouts-table">
              <thead>
                <tr>
                    <th className="tb-name">Name</th>
                    <th className="tb-id">Workout ID</th>
                    <th className="tb-view">View Workout</th>
                </tr>
              </thead>
              <tbody>
              {props.appSavedWorkouts.map(workout => {
                return (
                <tr>
                  <td>{workout.workouts_name}</td>
                  <td> {workout.id} </td>
                  <td>
                    <button>
                      <Link
                        to={`/past-workouts/${workout.id}`}
                      >
                        View
                      </Link>
                    </button>
                  </td>
                </tr>
              )})}
              </tbody>
            </table>
            <Link
              to='/create-workout'
            >
              <button>Create Workout</button>
            </Link>
            {/* <div>
              <CircleButton onClick={props.history.goBack}>
                Go Back
              </CircleButton>
            </div> */}
        </main>
    </div>
  );
}
