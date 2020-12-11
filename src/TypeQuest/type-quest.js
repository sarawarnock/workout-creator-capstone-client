import React from 'react'

export default class TypeQuest extends React.Component {
    render() {
        if (this.props.currentStep !== 3) { // Prop: The current step
            return null
        }
        return (
            <div className="form-group">
                <h2 className="workout-question-3">What style of workout would you like?</h2>
                <div className="workout-type answer-3">
                
                <input type="radio" id="emom" name="workoutTypeValue" value='emom' onClick={this.props.handleChange} />
                <label htmlFor="emom">EMOM (Every Minute On the Minute)</label>
                
                <input type="radio" id="amrap" name="workoutTypeValue" value='amrap' onClick={this.props.handleChange} />
                <label htmlFor="amrap">AMRAP (As Many Rounds As Possible)</label>

                </div>
            </div>
        )
    }
}