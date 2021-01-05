import React, { Component } from 'react';
import bell from "./Sounds/bellcrush_E_minor.wav";

const StopwatchContext = React.createContext({
    currentStep: 1,
    status: 0,
    time: {
        ms: 0,
        sec: 60,
        min: null
    },
    total_length: null,
    setStatus: () => {},
    setTime: () => {},
    setInterv: () => {},
    playSound: () => {},
    _start: () => {},
    _run: () => {},
    _pause: () => {},
    _resume: () => {},
    _reset: () => {},
    set_total_length: () => {},
})

export default StopwatchContext;

export class StopwatchProvider extends Component {
    state = {
        currentStep: 1,
        status: 0,
        time: {
            ms: 0,
            sec: 60,
            min: null
        },
        total_length: null,
    }

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

    setInterv = interv => {
        setInterval(this._run, interv)
    }

    playSound = () => {
        const audio = new Audio(bell);
        return audio.play();
    }

    _start = () => {
        this._run();
        this.setStatus(1);
        this.setInterv(10);
        this.playSound();
    };

    _run = () => {
        const { time } = this.state;
        let updatedMS = time.ms, updatedSec = time.sec, updatedMin = time.min;
        if (updatedSec === 0) {
            updatedSec = 60;
            updatedMin--;
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
        this.setInterv(null);
        this.setStatus(2);
    };

    _resume = () => this._start();

    _reset = () => {
        console.log('running reset stopwatch');
        const { total_length } = this.state;
        this.setInterv(null);
        this.setStatus(0);
        this.setTime(0, 60, total_length );
    };

    set_total_length = min => {
        console.log('setting total_length', min)
        this.setState({ total_length: min});
    }

    render() {
        const value = {
            currentStep: this.state.currentStep,
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
            total_length: this.state.total_length,
        }

        return (
            <StopwatchProvider value={value}>
                {this.props.children}
            </StopwatchProvider>
        )
    }
}

