import React from 'react';
import { Link } from 'react-router-dom';
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service';
// import ViewPastWorkout from './view-past-workout'
import WorkoutItem from './workout-item-lf';

export default class WorkoutsList extends React.Component {
    static contextType = WorkOutContext;

    componentDidMount() {
        this.context.clearError();
        WorkoutApiService.getWorkoutsById()
            .then(this.context.setWorkOutsList)
            .catch(this.context.setError);
    }

    render() {
        const { workouts } = this.context
        console.log('workouts', workouts);
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
                        {workouts.map(workout => 
                            <WorkoutItem 
                                key={workout.id}
                                workout={workout}
                            />
                        )}
                    </tbody>
                </table>
                <Link to="/create-workout"
                    className="try-it-link link">
                    New Workout
                </Link>
            </>
        )
    }
}