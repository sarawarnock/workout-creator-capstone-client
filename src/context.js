import React, { Component } from 'react';

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
    minutes: null,
    setError: () => {},
    clearError: () => {},
    setWorkout: () => {},
    clearWorkOut: () => {},
    setUser: () => {},
    clearUser: () => {},
    setWorkOutsList: () => {},
    clearWorkOutsList: () => {},
    toggleActive: () => {},
    setMinutes: () => {}
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
        minutes: null
    }

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

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    };

    setMinutes = minutes => {
        console.log('setting context minutes', minutes);
        this.setState({ minutes: minutes })
    }

    render() {
        const value = {
            error: this.state.error,
            user: this.state.user,
            workout: this.state.workout,
            userWorkouts: this.state.userWorkouts,
            workouts: this.state.workouts,
            active: this.state.active,
            minutes: this.state.minutes,
            setError: this.setError,
            clearError: this.clearError,
            setWorkout: this.setWorkout,
            clearWorkOut: this.clearWorkOut,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setWorkOutsList: this.setWorkOutsList,
            clearWorkOutsList: this.clearWorkOutsList,
            toggleActive: this.toggleActive,
            setMinutes: this.setMinutes
        };

        return (
            <WorkOutContext.Provider value={value}>
                {this.props.children}
            </WorkOutContext.Provider>
        );
    }
}