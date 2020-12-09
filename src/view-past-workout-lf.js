import React from 'react';
// import WorkOutDetail from './WorkOutDetail';
import WorkOutContext from './context';
import WorkoutApiService from './services/workout-api-service';

export default class ViewPastWorkout extends React.Component {
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
                {workout.map((detail, index) => {
                    return (
                        <div key={index}>
                            <h2 key="reps">{detail.exercise_reps}</h2>
                            <h3 key="title">{detail.title}</h3>
                            <h3 key="desc">{detail.description}</h3>
                        </div>
                    )}
                )}
            </>
        )
    }

    render() {
        const { error } = this.context;
        return ( 
            <>
                {error
                    ? <h2>There was an error try again</h2>
                    : this.renderArticles()
                }
            </>
        )
    }
  }