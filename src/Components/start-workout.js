import React from 'react';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import StartExercise from './start-exercise';
import Stopwatch from './Stopwatch';
import Loaders from './loaders';

export default class StartWorkout extends React.Component{
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;

    constructor(props) {
        super(props);
        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
        this.state = {
            currentStep: 1,
        }
    }

    componentDidMount() {
        this.context.clearError();
        const { workout_id } = this.props.match.params;
        WorkoutApiService.getWorkoutDetails(workout_id)
            .then(this.context.setWorkout)
            .catch(this.context.setError);

        WorkoutApiService.getWorkoutsById()
            .then(this.context.setWorkOutsList)
            .catch(this.context.setError);
    }

    _next = () => {
        let currentStep = this.state.currentStep;
        const { workout } = this.context;
        if (currentStep < workout.length) {
            this.setState({
                currentStep: currentStep + 1
            })
        }
        if (currentStep === workout.length) {
            this.setState({
                currentStep: 1
            })
        }
    }

    _prev = () => {
        let currentStep = this.state.currentStep;
        const { workout } = this.context;
        if (currentStep <= workout.length && currentStep > 1) {
            this.setState({
                currentStep: currentStep - 1
            })
        }
    }
    
    renderWorkOut() {        
        const { workout } = this.context;
        const { currentStep } = this.state;
        const i = currentStep - 1;
        const exercise = workout[i];

        if (workout.length === 0) {
            return <Loaders />
        }

        return (
            <>
                <StartExercise
                    clickNext={this._next}
                    clickPrev={this._prev}
                    exercise={exercise}
                />
                <Stopwatch
                    clickNext={this._next}
                    clickPrev={this._prev}
                    workout={workout}
                    length={workout[0].total_length}
                />
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