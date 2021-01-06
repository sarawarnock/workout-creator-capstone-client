import React, { Component } from 'react';
import CreateNewWorkout from '../Components/create-new-workout';

export default class CreateWorkoutRoute extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }
 
    handleSubmitSuccess = (id) => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/workouts/${id}`;
        history.push(destination);
    }

    render() {
        return (
            <div className="form-container create-container">
                <CreateNewWorkout
                    onSubmitSuccess={this.handleSubmitSuccess}
                />
            </div>
        )
    }
}