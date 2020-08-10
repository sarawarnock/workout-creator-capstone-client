import React, { Component } from "react";
import Checkbox from './new-workout-checkbox';
import config from './config'

const OPTIONS = ['Arms', 'Legs', 'Chest', 'Back', 'Core', 'Cardio', 'Advanced'];

class CreateNewWorkout2 extends Component {
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
    // workoutDetails: []
  };

  componentDidMount(){
      console.log('component SavedWorkouts is mounting')
      //get workouts by user ID
      let getWorkoutUrl = `${config.API_ENDPOINT}/workouts/user/1`;
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



  //POST to '/api/users' but randomize the data given the choices....

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
      user_id: 1
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
        //  window.location = `/create-workout`
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
    const showWorkouts = 
    this.state.savedWorkouts.map((workout, id) => {
    return (
      <div className="workouts-list" key={id}>
        <h2 className="workouts-list-name"> {workout.workouts_name} </h2>
          <p> {workout.total_length} minutes</p>
          <p> {workout.workout_type} </p>
      </div>)
    });

    //console.log(this.state.savedWorkoutDetails)
    //I dont know that we need to show any of these since the info from the workout details table just gives exercise IDs
    //But we do need the workout reps from this table
    // let showWorkoutDetailsTitle = this.state.savedWorkoutDetails.title
    // let showWorkoutDetailsDescription = this.state.savedWorkoutDetails.description
    // let showWorkoutDetailsReps = this.state.savedWorkoutDetails.exercise_reps
    
    // for (let i =0; i < this.state.savedWorkoutDetails.length; i++) {
    //     showWorkoutDetailsTitle = this.state.savedWorkoutDetails[i].title
    //     showWorkoutDetailsDescription = this.state.savedWorkoutDetails[i].description
    //     showWorkoutDetailsReps = this.state.savedWorkoutDetails[i].exercise_reps
    // } 
    
    let showWorkoutDetails = []
    for (let i = 0; i < this.state.savedWorkoutDetails.length; i++) {
        showWorkoutDetails.push(this.state.savedWorkoutDetails[i])
        //console.log(showWorkoutDetails)
    }
    showWorkoutDetails = showWorkoutDetails.map(workoutDetail => {
        let workoutDetailTitle = workoutDetail.title
        let workoutDetailReps = workoutDetail.exercise_reps
        let workoutDetailDescription = workoutDetail.description
        return (
            <div className="workout-details">
                <p key="reps"> {workoutDetailReps} </p>
                <p key="title"> {workoutDetailTitle} </p>
                <p key="desc"> {workoutDetailDescription} </p>
            </div>
        )
    });

    // const viewWorkout = 
    // <ViewPastWorkout
    //     title={this.state.savedWorkouts.workouts_name}
    //     workoutTime={this.state.savedWorkouts.total_length}
    //     workoutType={this.state.savedWorkouts.workout_type}
        
    // />

    //  this.state.savedWorkoutDetails.map((workoutDetails, id) => {
    //  return (
    //    <div className="workout-details" key={id}>
    //     <p className="exercise-reps"> {workoutDetails.exercise_reps} </p> 
    //    </div>)
    // });

    //savedExercises is an empty array
    // console.log(this.state)
    // console.log(this.state.savedExercises.length)
    // let showWorkoutExercises = ''
    // if (this.state.savedExercises.length == 0) {
    //     console.log('HELLO')
    //     showWorkoutExercises = 
    //         <div className="workout-exercises">
    //             <p> No Exercises </p>
    //         </div>
    // } else {
    //     showWorkoutExercises = 
    //     this.state.savedExercises.map((exercises, id) => {
    //     return (
    //       <div className="workout-exercises" key={id}>
    
    //         <h4> {exercises.title} </h4>
    //           <p> {exercises.description} </p>
    //       </div>)
    //     }); 
    // }
    //empty array
    // console.log(this.state.savedExercises)

    return (
      <div className="App">
        <div className="row mt-5">
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
                
                {/* <input type="radio" id="rft" name="workoutTypeValue" value="RFT" />  
                <label htmlFor="rft">RFT (Rounds For Time)</label>   */}
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
                <button type="submit" className="small-btn">
                  Submit
                </button>
              {/* </div> */}
            </form>
            {/* {this.state.isSubmitted && showWorkouts[showWorkouts.length - 1]} */}
            {showWorkouts[showWorkouts.length - 1]}
            <p> {showWorkoutDetails} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewWorkout2;