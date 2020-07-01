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
        <main class="main">
          <h1>Create New Workout</h1>
            <br />
            {/* Just select one of these */}
            <h2>How long do you want to workout for?</h2>
              <div className="workout-time">
                <label className="time" for="time-1">Less than 5 minutes</label>
                <input className="time" type="checkbox" id="time-1"/>
                <label for="time-2">6-10 minutes</label>
                <input className="time" type="checkbox" id="time-2" />
                <label for="time-3">11-15 minutes</label>
                <input type="checkbox" id="time-3" />
                <label for="time-4">16-20 minutes</label>
                <input type="checkbox" id="time-4" />
                <label for="time-5">21-25 minutes</label>
                <input type="checkbox" id="time-5" />
                <label for="time-6">26-30 minutes</label>
                <input type="checkbox" id="time-6" />
                <p class="error-msg">Must select one option</p>
              </div>
            <br />
            <br />
            {/* Can select as many as user wants */}
            <h2>What muscle groups do you want to work?</h2>
                <label for="group-1">Arms</label>
                <input type="checkbox" id="group-1" />
                <label for="group-2" >Legs</label>
                <input type="checkbox" id="group-2" />
                <label for="group-3">Chest</label>
                <input type="checkbox" id="group-3" />
                <label for="group-4">Back</label>
                <input type="checkbox" id="group-4" />
                <label for="group-5">Core</label>
                <input type="checkbox" id="group-5" />
                <label for="group-6">Cardio</label>
                <input type="checkbox" id="group-6" />
                <label for="group-7">Advanced Movements</label>
                <input type="checkbox" id="group-7" />

                <p class="error-msg">Must select at least one option</p>
            <br />
            <br />
            {/* Just select one of these */}
            <h2>What style of workout would you like?</h2>
                <label for="emom">EMOM (Every Minute On the Minute)</label>
                <input type="checkbox" id="emom" />
                <label for="amrap">AMRAP (As Many Rounds As Possible)</label>
                <input type="checkbox" id="amrap" />
                <label for="rft">RFT (Rounds Fot Time)</label>
                <input type="checkbox" id="rft" />
                <p class="error-msg">Must select one option</p>
            <br />
            <br />
            <button class="big-btn">GO!!</button>
        </main>
      </div>
    );
  }
}
