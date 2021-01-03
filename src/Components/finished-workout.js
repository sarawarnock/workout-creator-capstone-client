import React from 'react';
import { Link } from 'react-router-dom';

const FinishedWorkout = (props) => {
    const { workout } = props;
    return (
       <>       
        <h2>Great job!</h2>
        <Link className="finished-link"
            to={`workouts/start/${workout.workouts_id}`}>
            <h3>Restart</h3>
        </Link>
       </>
    )
}

export default FinishedWorkout