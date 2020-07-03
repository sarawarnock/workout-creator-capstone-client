import React from 'react';

export default class CreateNewWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

      errors: {
        time: 'You must select one option',
        muscle_group: 'You must select at least one option',
        type: 'You must select one option',
      }
    }
  }

  //handleSubmit - takes user right to the newly created workout 
  
  render() {
  return (
      <div className="App">
        <main className="main">
          <h1>Create New Workout</h1>
            <br />
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
                <label htmlFor="group-1">Arms</label>
                <input type="checkbox" id="group-1" />
                <label htmlFor="group-2" >Legs</label>
                <input type="checkbox" id="group-2" />
                <label htmlFor="group-3">Chest</label>
                <input type="checkbox" id="group-3" />
                <label htmlFor="group-4">Back</label>
                <input type="checkbox" id="group-4" />
                <label htmlFor="group-5">Core</label>
                <input type="checkbox" id="group-5" />
                <label htmlFor="group-6">Cardio</label>
                <input type="checkbox" id="group-6" />
                <label htmlFor="group-7">Advanced Movements</label>
                <input type="checkbox" id="group-7" />

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
        </main>
      </div>
    );
  }
}
