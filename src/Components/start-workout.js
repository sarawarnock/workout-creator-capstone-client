import React from 'react';
import { Link,  } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import StartExercise from './start-exercise';
import Stopwatch from './Stopwatch';

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

    _next = () => {
        console.log('trigger next:', this.state.currentStep);
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
        console.log('trigger prev:', this.state.currentStep);
        let currentStep = this.state.currentStep;
        const { workout } = this.context;
        if (currentStep <= workout.length && currentStep > 1) {
            this.setState({
                currentStep: currentStep - 1
            })
        }
    }

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
        console.log('props', this.props);
        const { workout } = this.context;
        const { currentStep } = this.state; 
        const num = currentStep - 1;
        const exercise = workout[num];

        if (workout.length === 0) {
            return <div>Loading</div>
        }

        return (
            <>
                <StartExercise 
                    clickNext={this._next}
                    clickPrev={this._prev}
                    exercise={exercise}
                    currentStep={currentStep}
                />
                <Stopwatch 
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