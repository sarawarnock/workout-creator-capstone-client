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
  };

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

  getRandomExercise(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        console.log(checkbox, "is selected.");
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
      workout_type: data.workoutTypeValue
    }

    //if unchecked, comes back as undefined, not "off"
  
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

      })
        .catch(err => {
          this.setState({
            error: err.message
        })
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
                <button type="submit" className="small-btn">
                  Submit
                </button>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewWorkout2;