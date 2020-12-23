import React from 'react';

const FinishedWorkout = (props) => {
    console.log(props)
    return (
       <h2>Great job!! You completed {props.name}! </h2> 
    )
}

export default FinishedWorkout