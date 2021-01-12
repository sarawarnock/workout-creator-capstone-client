import React from 'react';

export default class TimeQuest extends React.Component {
    render() {
        if (this.props.currentStep !== 2) { // Prop: The current step
            return null
        }
        return(
            <div className="form-group">
                <h2 className="workout-question-2">How long do you want to workout for?</h2>
                <div className="workout-time answer-2">
                <input type="radio" id="time-1"name="workoutTimeValue" value="6" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-1">6 minutes</label>

                <input type="radio" id="time-2" name="workoutTimeValue" value="10" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-2">10 minutes</label>
                
                <input type="radio" id="time-3" name="workoutTimeValue" value="15" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-3">15 minutes</label>
                
                <input type="radio" id="time-4" name="workoutTimeValue" value="20" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-4">20 minutes</label>
                
                <input type="radio" id="time-5" name="workoutTimeValue" value="25" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-5">25 minutes</label>
                
                <input type="radio" id="time-6" name="workoutTimeValue" value="30" onClick={this.props.handleChange} />
                <label className={"check"} htmlFor="time-6">30 minutes</label>
              </div>    
            </div>
        )
    }
}