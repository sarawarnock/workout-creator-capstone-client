import React, { Component } from 'react';

export const nullUser = {};
export const nullWorkOut = {};
export const nullUserWorkOuts = [];

const WorkOutContext = React.createContext({
    error: null,
    user: nullUser,
    workout: nullWorkOut,
    userWorkouts: nullUserWorkOuts,
    workouts: [],
    active: false,
    setError: () => {},
    clearError: () => {},
    setWorkout: () => {},
    clearWorkOut: () => {},
    setUser: () => {},
    clearUser: () => {},
    setWorkOutsList: () => {},
    clearWorkOutsList: () => {},
    toggleActive: () => {},
});

export default WorkOutContext;

export class WorkOutProvider extends Component {
    state = {
        error: null,
        user: nullUser,
        workout: nullWorkOut,
        userWorkouts: nullUserWorkOuts,
        workouts: [],
        active: false
    }

    setError = error => {
        this.setState({ error });
    };

    clearError = () => {
        this.setState({ error: null });
    };

    setWorkout = workout => {
        this.setState({ workout });
    };

    clearWorkOut = () => {
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
        this.setWorkOutsList({ nullUserWorkOuts });
    };

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    };

    render() {
        const value = {
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
            setWorkoutsList: this.setWorkOutsList,
            clearWorkOutsList: this.clearWorkOutsList,
            toggleActive: this.toggleActive
        };

        return (
            <WorkOutContext.Provider value={value}>
                {this.props.children}
            </WorkOutContext.Provider>
        );
    }
}