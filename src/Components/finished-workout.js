import React from 'react';

const FinishedWorkout = (props) => {
    return (
       <h2>Great job!! You completed {props.workout.workout_name}! </h2> 
    )
}

export default FinishedWorkout