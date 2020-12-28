import React from 'react'
import Checkbox from '../new-workout-checkbox'

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

export default class MuscleGroup extends React.Component {
    // selectAllCheckboxes = isSelected => {
    //     Object.keys(this.state.checkboxes).forEach(checkbox => {
    //       this.setState(prevState => ({
    //         checkboxes: {
    //           ...prevState.checkboxes,
    //           [checkbox]: isSelected
    //         }
    //       }));
    //     });
    //   }
      
    // handleCheckboxChange = changeEvent => {
    //     const { name } = changeEvent.target;
    
    //     this.setState(prevState => ({
    //       checkboxes: {
    //         ...prevState.checkboxes,
    //         [name]: !prevState.checkboxes[name]
    //       }
    //     }));
    // };

    createCheckbox = option => (
        <Checkbox
          label={option}
          isSelected={this.props.checkboxes[option]}
          onCheckboxChange={this.props.handleCheckboxChange}
          key={option}
          handleChange={this.props.handleChange}
        />
    );
    
    createCheckboxes = () => OPTIONS.map(this.createCheckbox);

    render() {
        if (this.props.currentStep !== 1) {
            return null
        }

        return(
            <div className="form-group">
                <h2 className="workout-question-1">Which muscle groups would you like to work?</h2>
                  <div className="checkbox">
                    {this.createCheckboxes()}
                  </div>
            </div>
        )
    }
}