import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';

export default class WorkoutItem extends Component {
    static contextType = WorkOutContext;

    handleDelete = () => {
        const { workout } = this.props;
        WorkoutApiService.deleteWorkout(workout.id)
            .then(res => {
                WorkoutApiService.getWorkoutsById()
                    .then(this.context.setWorkOutsList)
                    .catch(this.context.setError)
            })
    }

    render() {
        const { workout } = this.props;
        return(
            <tr key={workout.id}>
                <td className="wo-name left mar-40">{workout.workouts_name}</td>
                <td className={"mar-40"}>
                    <Link className="view-link"
                        to={`/workouts/${workout.id}`}
                    >
                        <p className={'label success new-label'}><span>View</span></p>
                    </Link>
                </td>
                <td className="right mar-40">
                    <button className="delete button"
                        onClick={this.handleDelete}>X</button>
                </td>
            </tr>
        )
    }
}