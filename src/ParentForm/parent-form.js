import React from 'react'

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

export default class ParentForm extends React.Component {
    state = {
        checkboxes: OPTIONS.reduce(
          (options, option) => ({
            ...options,
            [option]: false
          }),
          {}
        ),
        workoutTimeValue: '',
        workoutTypeValue: '',
        workoutNameValue: '',
        isSubmitted: false,
        savedWorkouts: [],
        savedWorkoutDetails: [],
        sessionUser: ''
      };
    

    handleTimeChange = (e) => {
        this.setState({ 
        workoutTimeValue: e.target.value
        })
    }

    handleTypeChange = (e) => {
        this.setState({
        workoutTypeValue: e.target.value
        })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}