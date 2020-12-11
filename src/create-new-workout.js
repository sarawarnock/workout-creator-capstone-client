import React, { Component } from "react";
import Checkbox from './new-workout-checkbox';
import config from './config'
import MuscleGroup from './MuscleGroupQuest/muscle-group'
import TimeQuest from './TimeQuest/time-quest'
import TypeQuest from './TypeQuest/type-quest'
import TokenService from './services/token-service-lf'
import WorkoutApiService from "./services/workout-api-service";

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

class CreateNewWorkout extends Component {
  constructor(props) {
    super(props)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)

    this.state = {
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      isSubmitted: false,
      savedWorkouts: [],
      savedWorkoutDetails: [],
      currentStep: 1,
      total_length: '', 
      workout_type: '',
      workouts_name: '',
      data: {}
    };
  }

  _next() {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2 ? 3 : currentStep + 1
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
    if (currentStep < 3) {
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


  //***** Do I need this if the workout is being saved and then viewed in the Past Workouts component? */
  // componentDidMount() {
  //     this.updateSessionUser(sessionStorage.user_id)
    
  //     console.log('component SavedWorkouts is mounting')
  //     //get workouts by user ID
  //     let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/${TokenService.getUserId()}`;
  //     fetch(getWorkoutUrl)
  //         .then(response => response.json())
  //         //map over the workouts by ID, returning each workout
  //         //so that we can get the individual workout details for that workout (including the exercises)
  //         .then(workouts => {
  //             workouts.map((workout) => {
  //                 // console.log(workout)
  //                 //------mapping workouts to get workout details---------------------
  //                 let getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/${workout.id}`;
  //                 fetch(getWorkoutDetailsUrl)
  //                     .then(response => response.json())
  //                     .then(workoutDetails => {
  //                         this.setState({
  //                             savedWorkoutDetails: workoutDetails
  //                             //savedWorkoutDetails: [...this.state.savedWorkoutDetails, ...workoutDetails]
  //                         });
  //                           //console.log(workoutDetails)
  //                       })
  //                     .catch(error => this.setState({ error }))
  //                 //---------------------------
  //               })
  //             this.setState({
  //                 savedWorkouts: workouts
  //             });
  //           })
  //   }

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

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }

  // handleTimeChange = (e) => {
  //   this.setState({ 
  //     workoutTimeValue: e.target.value
  //   })
  // }

  // handleTypeChange = (e) => {
  //   this.setState({
  //     workoutTypeValue: e.target.value
  //   })
  // }

  // handleNameChange = (e) => {
  //   this.setState({
  //     workoutNameValue: e.target.value
  //   })
  // }

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

  //POST to '/api/workouts' but randomize the data given the choices
  handleFormSubmit = (e) => {
    e.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        //console.log(checkbox, "is selected.");
    });

    //create an object to store the search filters
    const data = this.state.checkboxes
    //get all the from data from the form component
    const formData = new FormData(e.target)

     //for each of the keys in form data populate it with form value
     for (let value of formData) {
        data[value[0]] = value[1]
      }
    console.log({data})
    
    let payload = {
      is_advanced: this.checkString(data.Advanced),
      is_arms: this.checkString(data.Arms),
      is_back: this.checkString(data.Back),
      is_cardio: this.checkString(data.Cardio),
      is_chest: this.checkString(data.Chest),
      is_core: this.checkString(data.Core),
      is_legs: this.checkString(data.Legs),
      total_length: data.workoutTimeValue, 
      workout_type: data.workoutTypeValue,
      workouts_name: data.workoutNameValue
    }

    console.log(payload)
  
    WorkoutApiService.postWorkout(payload)
  };

  // createCheckbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={this.state.checkboxes[option]}
  //     onCheckboxChange={this.handleCheckboxChange}
  //     key={option}
  //   />
  // );

  // createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    //console.log(this.state.savedWorkouts)
    //console.log(this.state.savedWorkoutDetails)
    //const showWorkouts = 
    this.state.savedWorkouts.map((workout, id) => {
    return (
      <div className="workouts-list" key={id}>
        <h2 className="workouts-list-name"> {workout.workouts_name} </h2>
          <p> {workout.total_length} minutes</p>
          <p> {workout.workout_type} </p>
      </div>)
    });

    let showWorkoutDetails = []
    for (let i = 0; i < this.state.savedWorkoutDetails.length; i++) {
        showWorkoutDetails.push(this.state.savedWorkoutDetails[i])
    }

    console.log(showWorkoutDetails)

    if (showWorkoutDetails.length !== 0) {
      showWorkoutDetails = showWorkoutDetails.map(workoutDetail => {
        let workoutDetailTitle = workoutDetail.title
        let workoutDetailReps = workoutDetail.exercise_reps
        let workoutDetailDescription = workoutDetail.description
        return (
            <div className="workout-details">
                <h2 key="reps" className="exercise-reps"> {workoutDetailReps} </h2>
                <h3 key="title" className="exercise-title"> {workoutDetailTitle} </h3>
                <h3 key="desc" className="exercise-desc"> {workoutDetailDescription} </h3>
            </div>
        )
      });

      console.log(showWorkoutDetails)

    }
    else {
      showWorkoutDetails = `
        <div className="workout-details">
          <h3 key="title" className="exercise-title"> No Workout Details </h3>
        </div>
      `
    }
    
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