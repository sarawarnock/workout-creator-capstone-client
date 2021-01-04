import React, { Component } from 'react';
import bell from "./Sounds/bellcrush_E_minor.wav";

export const nullUser = {};
export const nullWorkOut = [];
export const nullUserWorkOuts = [];
export const nullWorkouts = [];

const WorkOutContext = React.createContext({
    error: null,
    user: nullUser,
    workout: nullWorkOut,
    userWorkouts: [],
    workouts: nullWorkouts,
    active: false,
    total_length: null,
    time: {
        ms: 0,
        sec: 60,
        min: null
    },
    status: 0,
    setStatus: () => {},
    setTime: () => {},
    playSound: () => {},
    _start: () => {},
    _run: () => {},
    _pause: () => {},
    _resume: () => {},
    _reset: () => {},
    set_total_length: () => {},
    setError: () => {},
    clearError: () => {},
    setWorkout: () => {},
    clearWorkOut: () => {},
    setUser: () => {},
    clearUser: () => {},
    setWorkOutsList: () => {},
    clearWorkOutsList: () => {},
});

export default WorkOutContext;

export class WorkOutProvider extends Component {
    state = {
        error: null,
        user: nullUser,
        workout: nullWorkOut,
        userWorkouts: [],
        workouts: nullWorkouts,
        active: false,
        total_length: null,
        time: {
            ms: 0,
            sec: 60,
            min: null
        },
        status: 0
    }
    //STOPWATCH FUNCTIONS
    setStatus = status => {
        this.setState({ status: status });
    }

    setTime = (ms, sec, min) => {
        this.setState({
            time: {
                ms: ms,
                sec: sec,
                min: min
            }
        })
    }

    playSound = () => {
        const audio = new Audio(bell);
        return audio.play();
    }

    _start = () => {
        this._run();
        this.setStatus(1);
        setInterval(this._run, 10);
        this.playSound();
    };

    _run = () => {
        const { time } = this.state;
        let updatedMS = time.ms, updatedSec = time.sec, updatedMin = time.min;
        if (updatedSec === 0) {
            updatedSec = 60;
            updatedMin--;
            this.props.updateMin();
            this.props.clickNext();
            this.playSound();
            console.log('still running...');
        }
        if (updatedMS === 100) {
            updatedMS = 0;
            updatedSec--;
        }
        if (updatedMin === 0) {
            this._reset();
        }
        updatedMS++;
        return this.setTime(updatedMS, updatedSec, updatedMin)
    }

    _pause = () => {
        console.log('running pause stopwatch');
        this.setState({ interval: null });
        this.setStatus(2);
    };

    _resume = () => this._start();

    _reset = () => {
        console.log('running reset stopwatch');
        const { total_length } = this.state;
        this.setState({ interv: null })
        this.setStatus(0);
        this.setTime(0, 60, total_length );
    };

    set_total_length = min => {
        this.setState({ total_length: min });
    }

    //APP FUNCTIONS
    setError = error => {
        console.log('setting context error:', error);
        this.setState({ error });
    };

    clearError = () => {
        console.log('clearing context error');
        this.setState({ error: null });
    };

    setWorkout = workout => {
        console.log('setting context workout:', workout); 
        this.setState({ workout });
    };

    clearWorkOut = () => {
        console.log('clearing context workout');
        this.setWorkout(nullWorkOut);
    };

    setUser = user => {
        console.log('setting context user:', user);
        this.setState({ user });
    };

    clearUser = () => {
        console.log('clearing context user');
        this.setState(nullUser);
    };

    setWorkOutsList = workouts => {
        console.log('setting context workouts:', workouts);
        this.setState({ workouts });
    };

    clearWorkOutsList = () => {
        console.log('clearing workouts list');
        this.setWorkOutsList({ nullWorkouts });
    };

    render() {
        const value = {
            status: this.state.status,
            time: this.state.time,
            setStatus: this.setStatus,
            setTime: this.setTime,
            playSound: this.playSound,
            _start: this._start,
            _run: this._run,
            _pause: this._pause,
            _resume: this._resume,
            _reset: this._reset,
            set_total_length: this.set_total_length,

            error: this.state.error,
            user: this.state.user,
            workout: this.state.workout,
            userWorkouts: this.state.userWorkouts,
            workouts: this.state.workouts,
            active: this.state.active,
            setError: this.setError,
            clearError: this.clearError,
            setWorkout: this.setWorkout,
            clearWorkOut: this.clearWorkOut,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setWorkOutsList: this.setWorkOutsList,
            clearWorkOutsList: this.clearWorkOutsList,
        };

        return (
            <WorkOutContext.Provider value={value}>
                {this.props.children}
            </WorkOutContext.Provider>
        );
    }
}