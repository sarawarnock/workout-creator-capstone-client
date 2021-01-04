import React from 'react';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import StartExercise from './start-exercise';
// import Stopwatch from './Stopwatch';
import StopwatchClass from "./Stopwatch-class";
import FinishedWorkout from './finished-workout';
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
            minutes: null
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

    // componentDidUpdate() {
    //     const { workout } = this.context;
    //     if (workout.length > 0 && this.state.minutes === null) {
    //         this.setState({ minutes: workout[0].total_length })
    //         // this.context.set_total_length(workout[0].total_length)
    //     }
    // }

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

    updateMin = () => {
        let minutes = this.state.minutes;
        this.setState(prevState => ({
            ...prevState,
            minutes: minutes - 1
        }))
    }
    
    renderWorkOut() {        
        const { workout } = this.context;
        const { currentStep } = this.state; 
        const i = currentStep - 1;
        const exercise = workout[i];

        console.log('start-workout state', this.state);
        console.log('context', this.context);

        if (workout.length === 0) {
            return <Loaders />
        }
        
        if (this.state.minutes === 0) {
            return <FinishedWorkout />
        }

        return (
            <>
                <StartExercise 
                    clickNext={this._next}
                    clickPrev={this._prev}
                    exercise={exercise}
                />
                <StopwatchClass
                    clickNext={this._next}
                    clickPrev={this._prev}
                    workout={workout}
                    length={workout[0].total_length}
                    updateMin={this.updateMin}
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