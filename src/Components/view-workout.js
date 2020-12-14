import React from 'react';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import CircleButton from './CircleButton/circle-button';

export default class ViewWorkout extends React.Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount() {
        const { workout_id } = this.props.match.params;
        this.context.clearError();
        WorkoutApiService.getWorkoutDetails(workout_id)
            .then(this.context.setWorkout)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearWorkOut();
    }

    renderWorkOut() {
        const { workout } = this.context;
        console.log(workout);
        if (workout.length === 0) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return ( 
            <>
                <h2>EMOM for {this.context.workout[0].total_length} minutes</h2>
                <table className="workouts-table">
                    <thead>
                        <tr className="tbh">
                            <td className="left"><h3>Exercise Name</h3></td>
                            <td><h3>Number of Reps</h3></td>
                            <td><h2 className="inst">Instructions</h2></td>
                        </tr>
                    </thead>
                    <tbody>
                        {workout.map((detail, index) => {
                            // round up for even number reps
                            if (detail.exercise_reps % 2 !== 0) 
                                detail.exercise_reps = detail.exercise_reps + 1;

                            return (
                                <tr className="tr"
                                    key={index}>
                                    <td><h4 className="dt up-c-left" key="title">{detail.title}</h4></td>
                                    <td><h4 className="num" key="reps">{detail.exercise_reps}</h4></td>
                                    <td className="up-c-left detail"><h4 key="desc">{detail.description}</h4></td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
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