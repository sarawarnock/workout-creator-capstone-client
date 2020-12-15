import React from 'react';
import { Link, useParams } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';

export default class StartWorkout extends React.Component{
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount() {
        // const { workout_id } = useParams();
        this.context.clearError();
        // WorkoutApiService.getWorkoutDetails(workout_id)
        //     .then(this.context.setWorkout)
        //     .catch(this.context.setError);
        WorkoutApiService.getWorkoutsById()
            .then(this.context.setWorkOutsList)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearWorkOut();
    }

    renderWorkOut() {
        const { workout } = this.context; 
        console.log('start workout:', workout);
        return (
            <>
                <div className="flex-cnt">
                    {/* <Link className="la"
                        to="/workouts">
                        <span className="arrow left-arrow"></span>
                    </Link>
                    <h2>EMOM for {this.context.workout[0].total_length} minutes</h2>
                    <Link className="ra"
                        to={`start/${workout_id}`}>
                        <span className="arrow right-arrow"></span>
                    </Link> */}
                </div>
            </>
        )
    }

    render() {
        const { error } = this.context;
        return ( 
            <>
                {error
                    ? <h2>There was an error try again</h2>
                    : this.renderWorkOut()
                }
            </>
        )
    }
}