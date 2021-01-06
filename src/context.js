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
        this.setState({ user });
    };

    clearUser = () => {
        this.setState(nullUser);
    };

    setWorkOutsList = workouts => {
        this.setState({ workouts });
    };

    clearWorkOutsList = () => {
        this.setWorkOutsList({ nullWorkouts });
    };

    render() {
        const value = {
            error: this.state.error,
            user: this.state.user,
            workout: this.state.workout,
            userWorkouts: this.state.userWorkouts,
            workouts: this.state.workouts,
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