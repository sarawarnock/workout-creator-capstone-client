import React from 'react';
import { Link,  } from 'react-router-dom';
import WorkOutContext from '../context';
import WorkoutApiService from '../Services/workout-api-service';
import StartExercise from './start-exercise';
import Stopwatch from './Stopwatch';
import FinishedWorkout from './finished-workout'

export default class StartWorkout extends React.Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = WorkOutContext;
    
    constructor(props) {
        super(props);
        this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
        this._start = this._start.bind(this);
        this._pause = this._pause.bind(this)
        this._run = this._run.bind(this)
        this.state = {
            currentStep: 1,
            time: {
                ms: 0,
                sec: 60,
                min: 5,
                //min: this.context.workout.total_length[0]
            },
            status: 0,
            interv: 0,
        }
    }

    // updatedMS = this.state.time.ms
    // updatedSec = this.state.time.sec 
    // updatedMin = this.state.time.min

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

    _run = () => {
        let finishedLength = this.context.workout[0].total_length
        console.log('Finished Length', finishedLength)
        if (finishedLength === 0) {
            this._pause();
            return this.renderFinished();
        }
        else if (this.state.time.sec === 0) {
            //this.setState({ time: { sec: 60 } })
            this.state.time.sec = 60;
            //this.setState({ time: { min: this.state.min-- } })
            this.state.time.min--;
            this._next();
        }
        else if (this.state.time.ms === 100) {
            //this.setState({ time: { ms: 0 } })
            //this.setState({ time: { sec: this.state.sec-- } })
            this.state.time.ms = 0;
            this.state.time.sec--;
        }
        else {
            finishedLength--
            //this.setState({ finishedMin: this.state.finishedMin--})
            //this.setState({ time: { ms: this.state.ms++ } })
            this.state.time.ms++;
            return this.setState({ ms: this.state.time.ms, sec: this.state.time.sec, min: this.state.time.min });
        }
    };

    _start = () => {
        this._run();
        this.setState({ status: 1 })
        this.setState({interv: setInterval(this._run, 10)});
    };

    _pause = () => {
        clearInterval(this.state.interv);
        this.setState({ status: 2 });
    };

    _reset = () => {
        clearInterval(this.state.interv);
        this.setState({ status: 0 });
        this.setState({ ms: 0, sec: 60, min: this.state.time.min });
    };

    _resume = () => this._start();


    componentDidMount() {
        console.log(this.context)
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

    renderFinished() {
        const { workout } = this.context;
        return ( 
            <FinishedWorkout 
                name={workout.workouts_name}
            /> 
        )
    }

    renderWorkOut() {
        //console.log('props', this.props);
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
                    //length={workout[0].total_length}
                    //clickNext={this._next}
                    //clickPrev={this._prev}
                    renderFinished={this.renderFinished}
                    _start={this._start}
                    _pause={this._pause}
                    _reset={this._reset}
                    _resume={this._resume}
                    _run={this._run}
                    status={this.state.status}
                    min={this.state.time.min}
                    ms={this.state.time.ms}
                    sec={this.state.time.sec}
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