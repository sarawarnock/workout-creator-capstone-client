import React from 'react';
import CircleButton from './CircleButton/circle-button'

export default function ViewPastWorkout(props) {
  return (
    <div className="App">
      <main className="main">
            <h1>{props.title}</h1>
            <h2>{props.workoutTime}</h2>
            <h2> {props.workoutType} </h2>
            <CircleButton onClick={props.history.goBack}>
          Go Back
        </CircleButton>
        </main>
    </div>
    
  );
}
