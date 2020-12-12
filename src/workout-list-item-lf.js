import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service';

export default class WorkoutItem extends Component {
    static contextType = WorkOutContext;

    handleDelete = () => {
        const { workout } = this.props;
        WorkoutApiService.deleteWorkout(workout.id)
            .then(res => {
                console.log('handleDelete res:', res);
                WorkoutApiService.getWorkoutsById()
                    .then(this.context.setWorkOutsList)
                    .catch(this.context.setError)
            })
    }

    render() {
        const { workout } = this.props
        return(
            <tr key={workout.id}>
                <td className="left">{workout.workouts_name}</td>
                {/* <td> {workout.id} </td> */}
                <td>
                    <Link className="view-link"
                        to={`/past-workouts/${workout.id}`}
                    >
                        View
                    </Link>
                </td>
                <td className="right">
                    <button className="delete button"
                        onClick={this.handleDelete}>x</button>
                </td>
            </tr>
        )
    }
}