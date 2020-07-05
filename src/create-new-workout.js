import React from 'react';

const OPTIONS = ['isArms', 'isLegs', 'isChest', 'isBack', 'isCore', 'isCardio', 'isAdvanced']

export default class CreateNewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      workoutTimeValue: '',
      // workoutMuscleGroup: {
      //   isArms: {
      //     touched: false,
      //   },
      //   isLegs: {
      //     touched: false,
      //   },
      //   isChest: {
      //     touched: false,
      //   },
      //   isBack: {
      //     touched: false,
      //   },
      //   isCore: {
      //     touched: false,
      //   },
      //   isCardio: {
      //     touched: false,
      //   },
      //   isAdvanced: {
      //     touched: false,
      //   }
      // },

      workoutMuscleGroup: OPTIONS.reduce(
        (option, option) => ({
          ...options, 
          [option]: false
        }),
        {}
      ),

      workoutTypeValue: '',
      errors: {
        workoutTimeValue: 'You must select one option',
        workoutMuscleGroup: 'You must select at least one option',
        workoutTypeValue: 'You must select one option',
      }
    }
  }

  //need logic that says if user clicks "Arms" then change the state of ifArms to true
  selectAllMuscleGroups = isSelected => {
    Object.keys(this.state.workoutMuscleGroup).forEach(checkbox => {
      this.setState(prevState => ({
        workoutMuscleGroup: {
          ...prevState.workoutMuscleGroup,
          [checkbox]: isSelected
        }
      }));
    });
  }

  selectAll = () => this.selectAllMuscleGroups(true);

  deselectAll = () => this.selectAllMuscleGroups(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  //handleSubmit - takes user right to the newly created workout 
  //is the handleSubmit a POST request? we are posting their responses but then getting the info back...?

  handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(this.state.workoutMuscleGroup)
      .filter(checkbox => this.state.workoutMuscleGroup[checkbox])
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

    let { isArms, isLegs, isChest, isBack, isCore, isCardio, isAdvanced } = data

  // //POST request to API endpoint (/users)

  // //check if the state is populated with the search params data
  // console.log(this.state)

  //const searchURL = `${config.API_ENDPOINT}/sign-up`

  const queryString = this.formatQueryParams(data)

   //sent all the params to the final url
   //const url = searchURL + '?' + queryString

   console.log(url)

    //define the API call parameters
    const options = {
        method: 'POST',
        header: {
            "Authorization": "",
            "Content-Type": "application/json"
        }
    }

    //useing the url and paramters above make the api call
    fetch(url, options)

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
}
  
  render() {
  return (
      <div className="App">
        <main className="main">
          <h1>Create New Workout</h1>
            <br />
            <form>
            {/* Just select one of these - need error message */}
            <h2>How long do you want to workout for?</h2>
              <div className="workout-time">
                <label htmlFor="time-1">Less than 5 minutes</label>
                <input type="radio" id="time-1"name="workoutTimeValue"/>
                <label htmlFor="time-2">6-10 minutes</label>
                <input type="radio" id="time-2" name="workoutTimeValue"/>
                <label htmlFor="time-3">11-15 minutes</label>
                <input type="radio" id="time-3" name="workoutTimeValue"/>
                <label htmlFor="time-4">16-20 minutes</label>
                <input type="radio" id="time-4" name="workoutTimeValue"/>
                <label htmlFor="time-5">21-25 minutes</label>
                <input type="radio" id="time-5" name="workoutTimeValue"/>
                <label htmlFor="time-6">26-30 minutes</label>
                <input type="radio" id="time-6" name="workoutTimeValue" />
                <p className="error-msg">Must select one option</p>
              </div>
            <br />
            <br />
            {/* Can select as many as user wants - need error message */}
            <h2>What muscle groups do you want to work?</h2>
                <label htmlFor="isArms">Arms</label>
                <input type="checkbox" id="isArms" name="workoutMuscleGroup" value="isArms" />
                <label htmlFor="isLegs" >Legs</label>
                <input type="checkbox" id="isLegs" name="workoutMuscleGroup" value="isLegs" />
                <label htmlFor="isChest">Chest</label>
                <input type="checkbox" id="isChest" name="workoutMuscleGroup" value="isChest" />
                <label htmlFor="isBack">Back</label>
                <input type="checkbox" id="isBack" name="workoutMuscleGroup" value="isBack" />
                <label htmlFor="isCore">Core</label>
                <input type="checkbox" id="isCore" name="workoutMuscleGroup" value="isCore" />
                <label htmlFor="isCardio">Cardio</label>
                <input type="checkbox" id="isCardio" name="workoutMuscleGroup" value="isCardio" />
                <label htmlFor="isAdvanced">Advanced Movements</label>
                <input type="checkbox" id="isAdvanced" name="workoutMuscleGroup" value="isAdvanced" />

                <p className="error-msg">Must select at least one option</p>
            <br />
            <br />
            {/* Just select one of these - need error message */}
            <h2>What style of workout would you like?</h2>
                <label htmlFor="emom">EMOM (Every Minute On the Minute)</label>
                <input type="radio" id="emom" name="workoutTypeValue"/>
                <label htmlFor="amrap">AMRAP (As Many Rounds As Possible)</label>
                <input type="radio" id="amrap" name="workoutTypeValue"/>
                <label htmlFor="rft">RFT (Rounds Fot Time)</label>
                <input type="radio" id="rft" name="workoutTypeValue"/>
                <p className="error-msg">Must select one option</p>
            <br />
            <br />
            <button className="big-btn">GO!!</button>
            </form>
        </main>
      </div>
    );
  }
}
