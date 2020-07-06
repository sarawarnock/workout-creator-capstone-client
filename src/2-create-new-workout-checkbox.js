import React, { Component } from "react";
import Checkbox from './new-workout-checkbox';

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
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
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

    let { checkboxes, workoutTimeValue, workoutTypeValue } = data
    
   // //POST request to API endpoint (/create-workout)

  // //check if the state is populated with the search params data
  // console.log(this.state)

  //const searchURL = `${config.API_ENDPOINT}/create-workout`

  // const queryString = this.formatQueryParams(data)

   //sent all the params to the final url
   //const url = searchURL + '?' + queryString

  //  console.log(url)

  //   //define the API call parameters
  //   const options = {
  //       method: 'POST',
  //       header: {
  //           "Authorization": "",
  //           "Content-Type": "application/json"
  //       }
  //   }

  //   //useing the url and paramters above make the api call
  //   fetch(url, options)

  //       // if the api returns data ...
  //       .then(res => {
  //           if (!res.ok) {
  //               throw new Error('Something went wrong, please try again later.')
  //           }
  //            // ... convert it to json
  //            return res.json()
  //       })
  //           // use the json api output
  //       .then(data => {

  //         //check if there is meaningfull data
  //         console.log(data);
  //         // check if there are no results
  //         if (data.totalItems === 0) {
  //           throw new Error('No data found')
  //       }

  //     })
  //       .catch(err => {
  //         this.setState({
  //           error: err.message
  //       })
  //     })
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
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
                <h2>Which muscle groups would you like to work?</h2>

              {this.createCheckboxes()}

            <h2>How long do you want to workout for?</h2>
              <div className="workout-time">
                <label htmlFor="time-1">Less than 5 minutes</label>
                <input type="radio" id="time-1"name="workoutTimeValue" value="Less than 5 minutes" onClick={this.handleTimeChange} />
                <label htmlFor="time-2">6-10 minutes</label>
                <input type="radio" id="time-2" name="workoutTimeValue" value="6-10 minutes" />
                <label htmlFor="time-3">11-15 minutes</label>
                <input type="radio" id="time-3" name="workoutTimeValue" value="11-15 minutes" />
                <label htmlFor="time-4">16-20 minutes</label>
                <input type="radio" id="time-4" name="workoutTimeValue" value="16-20 minutes" />
                <label htmlFor="time-5">21-25 minutes</label>
                <input type="radio" id="time-5" name="workoutTimeValue" value="21-25 minutes" />
                <label htmlFor="time-6">26-30 minutes</label>
                <input type="radio" id="time-6" name="workoutTimeValue" value="26-30 minutes" />
                <p className="error-msg">Must select one option</p>
              </div>    

              <h2>What style of workout would you like?</h2>
                <div className="workout-type">
                <label htmlFor="emom">EMOM (Every Minute On the Minute)</label>
                <input type="radio" id="emom" name="workoutTypeValue" value="EMOM" onClick={this.handleTypeChange} />
                <label htmlFor="amrap">AMRAP (As Many Rounds As Possible)</label>
                <input type="radio" id="amrap" name="workoutTypeValue" value="AMRAP" />
                <label htmlFor="rft">RFT (Rounds Fot Time)</label>
                <input type="radio" id="rft" name="workoutTypeValue" value="RFT" />    
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