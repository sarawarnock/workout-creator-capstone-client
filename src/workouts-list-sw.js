import React from 'react';
import { Link } from 'react-router-dom';
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service';
// import ViewPastWorkout from './view-past-workout'
import WorkoutListItem from './workout-list-item-lf';

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
                <>
                    <Link to="/create-workout"
                        className="create-link link">
                        Create New Workout
                    </Link>
                </>
            )
        }
        return (
            <>
                <h2>Saved Workouts</h2>
                <table className="workouts-table">
                    <thead>
                        <tr>
                            <th className="left tb-name">Name</th>
                            {/* <th className="tb-id">Workout ID</th> */}
                            <th className="tb-view center"></th>
                            <th className="tb-del right">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map(workout => 
                            <WorkoutListItem 
                                key={workout.id}
                                workout={workout}
                            />
                        )}
                    </tbody>
                </table>
                <Link to="/create-workout"
                    className="create-link link">
                    New Workout
                </Link>
            </>
        )
    }
}