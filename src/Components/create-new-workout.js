import React, { Component } from "react";
import MuscleGroup from '../Components/FormQuests/muscle-group';
import TimeQuest from '../Components/FormQuests/time-quest';
// import TypeQuest from './FormQuests/type-quest';
import NameWorkout from '../Components/FormQuests/name-workout-quest';
import WorkoutApiService from "../Services/workout-api-service";
import WorkoutContext from '../context';

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

class CreateNewWorkout extends Component {

  static contextType = WorkoutContext;

  constructor(props) {
    super(props)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this.state = {
      error: null,
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      currentStep: 1,
    };
  }
  // render next/prev buttons according to current page
  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    })
  }

  _prev() {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  get previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn arr"
          type="button" onClick={this._prev}
        >
          {'<'}
        </button>
      )
    } return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="btn arr"
          type="button" onClick={this._next}
        >
         {'>'}
        </button>
      )
    } return null
  }

  get submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 3) {
      return (
        <button className="btn arr" type="submit">
          Submit
        </button>
      )
    } return null;
  }
  
  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  }
  
  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }))    
  }

  checkString(inputString) {
    let outputText = inputString;
    if (inputString === undefined) {
        outputText = "";
    }
    if (inputString == null) {
        outputText = "";
    }
    return outputText;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    let payload = {
      is_advanced: this.state.checkboxes.Advanced,
      is_arms: this.state.checkboxes.Arms,
      is_back: this.state.checkboxes.Back,
      is_cardio: this.state.checkboxes.Cardio,
      is_chest: this.state.checkboxes.Chest,
      is_core: this.state.checkboxes.Core,
      is_legs: this.state.checkboxes.Legs,
      total_length: this.state.workoutTimeValue, 
      workout_type: "EMOM",
      workouts_name: this.state.workoutNameValue
    }
  
    WorkoutApiService.postWorkout(payload)
      .then(res => {
        console.log('postWorkout response', res);
        this.props.onSubmitSuccess(res.workout.id);
      })
      .catch(res => {
        console.log(res.error)
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state
    return (
      <>
        <div>{error}</div>
        <form className="create-form"
          onSubmit={this.handleFormSubmit}>
            <MuscleGroup
              currentStep={this.state.currentStep}
              checkboxes={this.state.checkboxes}
              handleCheckboxChange={this.handleCheckboxChange}
              handleChange={this.handleChange}
            />
            <TimeQuest 
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
            />
            {/* <TypeQuest 
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
            /> */}
            <NameWorkout
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
            />
            {this.previousButton}
            {this.nextButton}
            {this.submitButton}                
        </form>      
      </>

    );
  }
}

export default CreateNewWorkout;