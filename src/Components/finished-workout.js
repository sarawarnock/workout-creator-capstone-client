import React from 'react';
import { Link,  } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import StartExercise from './start-exercise';
import Stopwatch from './Stopwatch';

const FinishedWorkout = (props) => {
    return (
       <h2>Great job!! You completed {props.workout.workouts_name}! </h2> 
    )
}

export default FinishedWorkout