import React from 'react';
import CircleButton from './CircleButton/circle-button'

export default function ViewPastWorkout(props) {
  console.log(props.match.params.workout_id)
  return (
    <div className="App">
      <main className="main">
        {props.appSavedWorkoutDetails.map(workoutDetail=> {
          if (props.match.params.workout_id == workoutDetail.workouts_id) {
            return (
              <div>
                <h2>{workoutDetail.exercise_reps}</h2>
                <h3>{workoutDetail.title}</h3>
                <h3> {workoutDetail.description} </h3>
              </div>
            )
          }})
          }
            
          
            <CircleButton onClick={props.history.goBack}>
          Go Back
        </CircleButton>
        </main>
    </div>
    
  );
}
