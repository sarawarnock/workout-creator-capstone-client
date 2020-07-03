import React from 'react';
import CircleButton from './CircleButton/circle-button'

export default function ViewPastWorkout(props) {
  return (
    <div className="App">
      <main className="main">
            <h1>Workout Name</h1>
            <h2>EMOM 10</h2>
            <p>Minute 1: 15 situps</p>
            <p>Minute 2: 20 lunges</p>
            <CircleButton onClick={props.history.goBack}>
          Go Back
        </CircleButton>
        </main>
    </div>
    
  );
}
