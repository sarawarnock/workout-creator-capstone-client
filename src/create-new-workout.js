import React, { Component } from "react";
import MuscleGroup from './FormQuests/muscle-group';
import TimeQuest from './FormQuests/time-quest';
import TypeQuest from './FormQuests/type-quest';
import NameWorkoutQuest from './FormQuests/NameWorkoutQuest';
import WorkoutApiService from "./services/workout-api-service";

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

class CreateNewWorkout extends Component {

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

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
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
          className="btn btn-secondary"
          type="button" onClick={this._prev}
        >
          Previous
        </button>
      )
    }
    return null;
  }

  get nextButton() {
    console.log(this.state)
    let currentStep = this.state.currentStep;
    if (currentStep < 4) {
      return (
        <button
          className="btn btn-primary"
          type="button" onClick={this._next}
        >
          Next
        </button>
      )
    }
    return null
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
    console.log({inputString});
    let outputText = inputString;
    if (inputString === undefined) {
        outputText = "";
    }
    if (inputString == null) {
        outputText = "";
    }
    return outputText;
  }

  //POST to '/api/workouts' but randomize the data given the choices
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
      workout_type: this.state.workoutTypeValue,
      workouts_name: this.state.workoutNameValue
    }

    console.log({payload})
  
    WorkoutApiService.postWorkout(payload)
      .then(res => {
        console.log('postWorkout response', res);
        this.props.onSubmitSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    //console.log(this.state.savedWorkouts)
    //console.log(this.state.savedWorkoutDetails)
    //const showWorkouts = 
    // this.state.savedWorkouts.map((workout, id) => {
    // return (
    //   <div className="workouts-list" key={id}>
    //     <h2 className="workouts-list-name"> {workout.workouts_name} </h2>
    //       <p> {workout.total_length} minutes</p>
    //       <p> {workout.workout_type} </p>
    //   </div>)
    // });

    // let showWorkoutDetails = []
    // for (let i = 0; i < this.state.savedWorkoutDetails.length; i++) {
    //     showWorkoutDetails.push(this.state.savedWorkoutDetails[i])
    // }

    // console.log(showWorkoutDetails)

    // if (showWorkoutDetails.length !== 0) {
    //   showWorkoutDetails = showWorkoutDetails.map(workoutDetail => {
    //     let workoutDetailTitle = workoutDetail.title
    //     let workoutDetailReps = workoutDetail.exercise_reps
    //     let workoutDetailDescription = workoutDetail.description
    //     return (
    //         <div className="workout-details">
    //             <h2 key="reps" className="exercise-reps"> {workoutDetailReps} </h2>
    //             <h3 key="title" className="exercise-title"> {workoutDetailTitle} </h3>
    //             <h3 key="desc" className="exercise-desc"> {workoutDetailDescription} </h3>
    //         </div>
    //     )
    //   });

    //   console.log({showWorkoutDetails})

    // }
    // else {
    //   showWorkoutDetails = `
    //     <div className="workout-details">
    //       <h3 key="title" className="exercise-title"> No Workout Details </h3>
    //     </div>
    //   `
    // }
    
    return (
      <div className="App">
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
                {/* <h2 className="workout-question-1">Which muscle groups would you like to work?</h2>
                  <div className="checkbox">
                    {this.createCheckboxes()}
                  </div>

            <h2 className="workout-question-2">How long do you want to workout for?</h2>
              <div className="workout-time answer-2">
                <input type="radio" id="time-1"name="workoutTimeValue" value="5" onClick={this.handleTimeChange} />
                <label htmlFor="time-1">5 minutes</label>

                <input type="radio" id="time-2" name="workoutTimeValue" value="10" />
                <label htmlFor="time-2">10 minutes</label>
                
                <input type="radio" id="time-3" name="workoutTimeValue" value="15" />
                <label htmlFor="time-3">15 minutes</label>
                
                <input type="radio" id="time-4" name="workoutTimeValue" value="20" />
                <label htmlFor="time-4">20 minutes</label>
                
                <input type="radio" id="time-5" name="workoutTimeValue" value="25" />
                <label htmlFor="time-5">25 minutes</label>
                
                <input type="radio" id="time-6" name="workoutTimeValue" value="30" />
                <label htmlFor="time-6">30 minutes</label>
              </div>     */}

              {/* <h2 className="workout-question-3">What style of workout would you like?</h2>
                <div className="workout-type answer-3">
                
                <input type="radio" id="emom" name="workoutTypeValue" value="EMOM" onClick={this.handleTypeChange} />
                <label htmlFor="emom">EMOM (Every Minute On the Minute)</label>
                
                <input type="radio" id="amrap" name="workoutTypeValue" value="AMRAP" />
                <label htmlFor="amrap">AMRAP (As Many Rounds As Possible)</label>

                </div> */}
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

                <TypeQuest 
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                />

                <NameWorkoutQuest
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                />

                <br />
                {/* Need logic that says - "if logged in, name workout" */}
                {/* <h2>Name Your Workout:</h2>
                <div className="workouts-name">
                  <input 
                    name="workoutNameValue"
                    type="text" 
                    id="workouts-name-input"
                    placeholder="Example: Workout 1"
                    onChange={this.handleNameChange}
                  />
                </div> */}
                {this.previousButton}
                {this.nextButton}
                <br />
                
                <button type="submit" className="big-btn">
                  Submit
                </button>
            </form>
            {/* {showWorkouts[showWorkouts.length - 1]}
            {showWorkoutDetails} */}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewWorkout;