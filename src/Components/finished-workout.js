import React from 'react';

const FinishedWorkout = (props) => {
    return (
       <h2>Great job!! You completed {props.workout.name}! </h2> 
    )
}

export default FinishedWorkout