import React from 'react';
import { Link,  } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
export default class StartWorkout extends React.Component{
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount() {
        const { workout_id } = this.props.match.params
        this.context.clearError();
        WorkoutApiService.getWorkoutDetails(workout_id)
            .then(this.context.setWorkout)
            .catch(this.context.setError);
        WorkoutApiService.getWorkoutsById()
            .then(this.context.setWorkOutsList)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearWorkOut();
    }

    renderWorkOut() {
        const { workout_id } = this.props.match.params
        const { workout } = this.context; 
        console.log('props', this.props);

        if (workout.length === 0) {
            return <div>Loading</div>
        }

        console.log('start workout:', workout);
        return (
            <>
                <div className="flex-cnt">
                    <Link className="la"
                        to={`/workouts/${workout_id}`}>
                        <span className="arrow left-arrow"></span>
                    </Link>
                    <h2>{workout[0].total_length} minutes</h2>
                    <Link className="ra"
                        to={`/workouts/${workout_id}`}>
                        <span className="arrow right-arrow"></span>
                    </Link>
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