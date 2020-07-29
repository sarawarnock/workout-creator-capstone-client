import React from 'react';
import CircleButton from './CircleButton/circle-button'

export default function NewWorkoutCreated(props) {
  return (
    <div className="App">
      <p>New Workout Created</p>
      <main className="main">
            <h1>New Workout</h1>
            <p>Here is your newest workout!</p>
            <h2> {props.workoutNameValue} </h2>
            <h2>Time Domain</h2>
            <h3> {props.workoutTimeValue} </h3>
            <h2>Muscle Groups</h2>
            <h3> {props.muscleGroup} </h3>
            <h2>Workout Type</h2>
            <h3> {props.workoutTypeValue} </h3>
            <br />
            <br />
            <div className="new-workout">
                <h2>Workout Name/Date</h2>
                <h3>Example: EMOM 9</h3>
                <p>Minute 1: 10 pushups</p>
                <p>Minute 2: 10 V ups</p>
                <p>Minute 3: 20 jumping lunges</p>
            </div>
            {/* <CircleButton onClick={props.history.goBack}>
              Go Back
            </CircleButton> */}
        </main>
    </div>
  );
}

