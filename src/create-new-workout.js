import React, { Component } from "react";
import Checkbox from './new-workout-checkbox';
import config from './config'
import TokenService from './services/token-service.js';

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

class CreateNewWorkout extends Component {
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

  updateSessionUser(userId) {
    this.setState({
      sessionUser: userId
    })
  }

  componentDidMount() {
      this.updateSessionUser(sessionStorage.user_id)
    
      console.log('component SavedWorkouts is mounting')
      //get workouts by user ID
      let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/${TokenService.getUserId()}`;
      fetch(getWorkoutUrl)
          .then(response => response.json())
          //map over the workouts by ID, returning each workout
          //so that we can get the individual workout details for that workout (including the exercises)
          .then(workouts => {
              workouts.map((workout) => {
                  // console.log(workout)
                  //------mapping workouts to get workout details---------------------
                  let getWorkoutDetailsUrl = `${config.API_ENDPOINT}/workoutdetails/workout/${workout.id}`;
                  fetch(getWorkoutDetailsUrl)
                      .then(response => response.json())
                      .then(workoutDetails => {
                          this.setState({
                              savedWorkoutDetails: workoutDetails
                              //savedWorkoutDetails: [...this.state.savedWorkoutDetails, ...workoutDetails]
                          });
                            //console.log(workoutDetails)
                        })
                      .catch(error => this.setState({ error }))
                  //---------------------------
                })
              this.setState({
                  savedWorkouts: workouts
              });
            })
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
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
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

  handleNameChange = (e) => {
    this.setState({
      workoutNameValue: e.target.value
    })
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

  //POST to '/api/workouts' but randomize the data given the choices
  handleFormSubmit = (e) => {
    e.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        //console.log(checkbox, "is selected.");
    });

    //create an object to store the search filters
    const data = {}
    //get all the from data from the form component
    const formData = new FormData(e.target)

     //for each of the keys in form data populate it with form value
     for (let value of formData) {
        data[value[0]] = value[1]
    }
    console.log(data)
    
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
      workouts_name: data.workoutNameValue,
      user_id: sessionStorage.user_id
    }

    console.log(payload)
  
    fetch(`${config.API_ENDPOINT}/workouts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        // if the api returns data ...
        .then(res => {
            if (!res.ok) {
                throw new Error('Something went wrong, please try again later.')
            }
             // ... convert it to json
             return res.json()
        })
            // use the json api output
        .then(data => {
          //check if there is meaningfull data
          console.log(data);
          // check if there are no results
          if (data.totalItems === 0) {
            throw new Error('No data found')
          }
          this.setState({
              savedWorkouts: [...this.state.savedWorkouts, data.workout],
              savedWorkoutDetails: data.workoutDetails
          });
          this.props.saveNewWorkout(data);
          window.location = `/past-workouts`
      })
        .catch(err => {
          this.setState({
            error: err.message
        })
      })

      this.setState({
        workoutNameValue: data.workoutNameValue,
        workoutTimeValue: data.workoutTimeValue,
        workoutTypeValue: data.workoutTypeValue,
        isSubmitted: true
      })
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    console.log(this.state.savedWorkouts)
    console.log(this.state.savedWorkoutDetails)
    const showWorkouts = 
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
                <h2 className="workout-question-1">Which muscle groups would you like to work?</h2>
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
              </div>    

              <h2 className="workout-question-3">What style of workout would you like?</h2>
                <div className="workout-type answer-3">
                
                <input type="radio" id="emom" name="workoutTypeValue" value="EMOM" onClick={this.handleTypeChange} />
                <label htmlFor="emom">EMOM (Every Minute On the Minute)</label>
                
                <input type="radio" id="amrap" name="workoutTypeValue" value="AMRAP" />
                <label htmlFor="amrap">AMRAP (As Many Rounds As Possible)</label>

                </div>
                <br />
                <h2>Name Your Workout:</h2>
                <div className="workouts-name">
                  <input 
                    name="workoutNameValue"
                    type="text" 
                    id="workouts-name-input"
                    placeholder="Example: Workout 1"
                    onChange={this.handleNameChange}
                  />
                </div>
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