import React, { Component } from 'react';
// import Login from './log-in';
import CreateNewWorkout from './create-new-workout';

export default class CreateWorkoutRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }
 
    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/past-workouts';
        history.push(destination);
    }

    render() {
        return (
            <div className="form-container">
                {/* <h2>Create New Workout</h2> */}
                <CreateNewWorkout 
                    onSubmitSuccess={this.handleSubmitSuccess}
                />
            </div>
        )
    }
}