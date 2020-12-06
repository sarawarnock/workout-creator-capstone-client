import React from 'react';
import { Link } from 'react-router-dom'
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service'
import ViewPastWorkout from './view-past-workout'

export default class PastWorkouts extends React.Component {
    static contextType = WorkOutContext

    componentDidMount() {
        const { user } = this.context
        console.log(this.context.user)
        WorkoutApiService.getWorkoutsById(user.id)
            .then(this.context.setWorkOutsList)
    }

    render() {
        const { workouts } = this.context
        if (workouts.length === 0) {
            return (
                <div>
                    Loading
                </div>
            )
        }
        return (
            <>
                <h2>Past Workouts</h2>
                <table className="workouts-table">
                <thead>
                    <tr>
                        <th className="tb-name">Name</th>
                        <th className="tb-id">Workout ID</th>
                        <th className="tb-view">View Workout</th>
                    </tr>
                </thead>
                <tbody>
                {workouts.map(workout => {
                    return (
                    <tr>
                    <td>{workout.workouts_name}</td>
                    <td> {workout.id} </td>
                    <td>
                        <button>
                        <Link
                            to={`/past-workouts/${workout.id}`}
                        >
                            View
                        </Link>
                        </button>
                    </td>
                    </tr>
                )})}
                </tbody>
                </table>
            </>
        )
    }
}