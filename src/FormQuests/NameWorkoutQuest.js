import React from 'react'

export default class TypeQuest extends React.Component {
    render() {
        if (this.props.currentStep !== 3) { // Prop: The current step
            return null
        }
        return (
            
            <div className="form-group">
                <h2>Name Your Workout:</h2>
                <div className="workouts-name">
                    <input 
                        name="workoutNameValue"
                        type="text" 
                        id="workouts-name-input"
                        placeholder="Example: Workout 1"
                        onChange={this.props.handleChange}
                    />
                </div>
            </div>
        )
    }
}