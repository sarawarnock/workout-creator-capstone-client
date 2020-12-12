import React from 'react';
// import WorkOutDetail from './WorkOutDetail';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';

export default class ViewWorkout extends React.Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    componentDidMount() {
        console.log('view workout context', this.context);
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
                <table className="workouts-table">
                    <thead>
                        <tr>
                            <td className="left"><h3>Name</h3></td>
                            <td><h3>Reps</h3></td>
                            <td><h2 className="inst">Instructions</h2></td>
                        </tr>
                    </thead>
                    <tbody>
                        {workout.map((detail, index) => {
                            return (
                                // <div className="ic" key={index}>
                                <tr key={index}>
                                    <td><h4 className="dt up-c-left" key="title">{detail.title}</h4></td>
                                    <td><h4 className="num" key="reps">{detail.exercise_reps}</h4></td>
                                    <td className="up-c-left"><h4 key="desc">{detail.description}</h4></td>
                                </tr>
                                    
                                // </div>
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