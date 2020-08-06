import React from 'react';
import CircleButton from './CircleButton/circle-button'

export default function ViewPastWorkout(props) {
  return (
    <div className="App">
      <main className="main">
        {props.appSavedWorkoutDetails.map((workoutDetail, workouts_id )=> {
          return (
          <div>
            <h1>{workoutDetail.title}</h1>
            <h2>{workoutDetail.workoutTime}</h2>
            <h2> {workoutDetail.workoutType} </h2>
          </div>
        )})}
          
            <CircleButton onClick={props.history.goBack}>
          Go Back
        </CircleButton>
        </main>
    </div>
    
  );
}
