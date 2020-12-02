import React, { Component } from 'react';

export const nullUser = {};
export const nullWorkOut = {};
export const nullUserWorkOuts = [];

const WorkoutContext = React.createContext({
    error: null,
    user: nullUser,
    workout: nullWorkOut,
    userWorkouts: nullUserWorkOuts,
    workouts: [],
    active: false,
    setError: () => {},
    clearError: () => {},
    setWorkout: () => {},
    clearWorkout: () => {},
    setUser: () => {},
    clearUser: () => {},
    setWorkOutsList: () => {},
    clearWorkoutsList: () => {},
    toggleActive: () => {},
});

export default Context;

export class WorkoutContext extends Component {
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

    clearWorkout = () => {
        this.setWorkout(nullWorkout);
    };

    setUser = user => {
        this.setState({ user });
    };

    clearUser = () => {
        this.setState(nullUser);
    };

    setWorkOutsList = workouts => {
        this.setState({ workouts });
    };

    clearWorkoutsList = () => {
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
            clearWorkout: this.clearWorkout,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setWorkoutsList: this.setWorkOutsList,
            clearWorkoutsList: this.clearWorkoutsList,
            toggleActive: this.toggleActive
        };

        return (
            <WorkoutContext.Provider value={value}>
                {this.props.children}
            </WorkoutContext.Provider>
        );
    }
}